import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User'
  };

  const mockAuthResponse = {
    token: 'mock-token',
    refreshToken: 'mock-refresh-token',
    user: mockUser
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should successfully log in user and store credentials', () => {
      const email = 'test@example.com';
      const password = 'password123';

      service.login(email, password).subscribe((response) => {
        expect(response).toEqual(mockAuthResponse);
        expect(localStorage.getItem('auth_token')).toBe(mockAuthResponse.token);
        expect(localStorage.getItem('refresh_token')).toBe(mockAuthResponse.refreshToken);
        expect(localStorage.getItem('auth_user')).toBe(JSON.stringify(mockAuthResponse.user));
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email, password });
      req.flush(mockAuthResponse);

      service.isAuthenticated().subscribe(isAuth => {
        expect(isAuth).toBe(true);
      });

      service.getCurrentUser().subscribe(user => {
        expect(user).toEqual(mockAuthResponse.user);
      });
    });
  });

  describe('signup', () => {
    it('should successfully sign up user and store credentials', () => {
      const email = 'test@example.com';
      const password = 'password123';
      const name = 'Test User';

      service.signup(email, password, name).subscribe((response) => {
        expect(response).toEqual(mockAuthResponse);
        expect(localStorage.getItem('auth_token')).toBe(mockAuthResponse.token);
        expect(localStorage.getItem('refresh_token')).toBe(mockAuthResponse.refreshToken);
        expect(localStorage.getItem('auth_user')).toBe(JSON.stringify(mockAuthResponse.user));
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/signup');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email, password, name });
      req.flush(mockAuthResponse);

      service.isAuthenticated().subscribe(isAuth => {
        expect(isAuth).toBe(true);
      });
    });
  });

  describe('logout', () => {
    it('should clear credentials and navigate to login page on successful logout', fakeAsync(() => {
      // Setup initial state
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('refresh_token', 'test-refresh-token');
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      const navigateSpy = spyOn(router, 'navigate');

      service.logout().subscribe(() => {
        expect(localStorage.getItem('auth_token')).toBeNull();
        expect(localStorage.getItem('refresh_token')).toBeNull();
        expect(localStorage.getItem('auth_user')).toBeNull();
        expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/logout');
      expect(req.request.method).toBe('POST');
      req.flush({});

      tick();

      service.isAuthenticated().subscribe(isAuth => {
        expect(isAuth).toBe(false);
      });

      service.getCurrentUser().subscribe(user => {
        expect(user).toBeNull();
      });
    }));

    it('should handle logout error gracefully', fakeAsync(() => {
      const navigateSpy = spyOn(router, 'navigate');

      service.logout().subscribe(() => {
        expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/logout');
      req.error(new ErrorEvent('Network error'));

      tick();
    }));
  });

  describe('refreshToken', () => {
    it('should successfully refresh token', () => {
      // Setup initial state
      localStorage.setItem('refresh_token', 'old-refresh-token');
      localStorage.setItem('auth_user', JSON.stringify({ _id: 1, ...mockUser }));

      service.refreshToken().subscribe((response) => {
        expect(response).toEqual(mockAuthResponse);
        expect(localStorage.getItem('auth_token')).toBe(mockAuthResponse.token);
        expect(localStorage.getItem('refresh_token')).toBe(mockAuthResponse.refreshToken);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/refresh');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        refresh_token: 'old-refresh-token',
        userId: 1
      });
      req.flush(mockAuthResponse);
    });

    it('should return error when no refresh token available', (done) => {
      localStorage.removeItem('refresh_token');

      service.refreshToken().subscribe({
        error: (error) => {
          expect(error.message).toBe('No refresh token available');
          done();
        }
      });
    });
  });

  describe('forceLogout', () => {
    it('should clear all credentials and navigate to login', fakeAsync(() => {
      // Setup initial state
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('refresh_token', 'test-refresh-token');
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      const navigateSpy = spyOn(router, 'navigate');

      service.forceLogout();
      tick();

      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('refresh_token')).toBeNull();
      expect(localStorage.getItem('auth_user')).toBeNull();
      expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);

      service.isAuthenticated().subscribe(isAuth => {
        expect(isAuth).toBe(false);
      });

      service.getCurrentUser().subscribe(user => {
        expect(user).toBeNull();
      });
    }));
  });

  describe('getStoredUser', () => {
    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem('auth_user', 'invalid-json');
      const user = (service as any).getStoredUser();
      expect(user).toBeNull();
    });

    it('should return null when no user data exists', () => {
      const user = (service as any).getStoredUser();
      expect(user).toBeNull();
    });

    it('should return parsed user data when valid', () => {
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      const user = (service as any).getStoredUser();
      expect(user).toEqual(mockUser);
    });
  });
});
