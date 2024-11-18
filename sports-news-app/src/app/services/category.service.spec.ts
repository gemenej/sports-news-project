import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService } from './category.service';
import { Category, CategoryResponse } from '../models/category.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [CategoryService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);

    // Handle the initial loadCategories call from constructor
    const req = httpMock.expectOne('http://localhost:3000/api/categories');
    req.flush({ categories: [] });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load categories', () => {
    const mockCategories: CategoryResponse = {
      categories: [{ _id: 1, name: 'Test Category', slug: 'test-category' }],
      totalItems: 1,
    };

    service.loadCategories();

    const req = httpMock.expectOne('http://localhost:3000/api/categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);

    service.categories$.subscribe((categories) => {
      expect(categories.length).toBe(1);
      expect(categories[0].name).toBe('Test Category');
    });
  });

  it('should add a category', fakeAsync(() => {
    const newCategory: Category = {
      _id: 2,
      name: 'New Category',
      slug: 'new-category',
    };

    service.addCategory(newCategory);

    // Handle POST request
    const postReq = httpMock.expectOne('http://localhost:3000/api/categories');
    expect(postReq.request.method).toBe('POST');
    postReq.flush(newCategory);

    // Handle subsequent GET request from loadCategories
    const getReq = httpMock.expectOne('http://localhost:3000/api/categories');
    expect(getReq.request.method).toBe('GET');
    getReq.flush({ categories: [newCategory] });

    // Handle the snackbar timer
    tick(3000);

    service.categories$.subscribe((categories) => {
      expect(categories.length).toBe(1);
      expect(categories[0].name).toBe('New Category');
    });
  }));

  it('should delete a category', fakeAsync(() => {
    const categoryId = 1;

    service.deleteCategory(categoryId);

    // Handle DELETE request
    const deleteReq = httpMock.expectOne(`http://localhost:3000/api/categories/${categoryId}`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});

    // Handle subsequent GET request from loadCategories
    const getReq = httpMock.expectOne('http://localhost:3000/api/categories');
    expect(getReq.request.method).toBe('GET');
    getReq.flush({ categories: [] });

    // Handle the snackbar timer
    tick(3000);

    service.categories$.subscribe((categories) => {
      expect(categories.length).toBe(0);
    });
  }));

  it('should update a category', fakeAsync(() => {
    const updatedCategory: Category = {
      _id: 1,
      name: 'Updated Category',
      slug: 'updated-category',
    };

    service.updateCategory(updatedCategory);

    // Handle PUT request
    const putReq = httpMock.expectOne(`http://localhost:3000/api/categories/${updatedCategory._id}`);
    expect(putReq.request.method).toBe('PUT');
    putReq.flush(updatedCategory);

    // Handle subsequent GET request from loadCategories
    const getReq = httpMock.expectOne('http://localhost:3000/api/categories');
    expect(getReq.request.method).toBe('GET');
    getReq.flush({ categories: [updatedCategory] });

    // Handle the snackbar timer
    tick(3000);

    service.categories$.subscribe((categories) => {
      expect(categories.length).toBe(1);
      expect(categories[0].name).toBe('Updated Category');
    });
  }));

  it('should get a category by ID', () => {
    const mockCategories: Category[] = [
      { _id: 1, name: 'Test Category', slug: 'test-category' },
    ];
    service['categoriesSubject'].next(mockCategories);

    const category = service.getCategory(1);
    expect(category).toBeTruthy();
    expect(category?.name).toBe('Test Category');
  });

  it('should get a category by slug', (done) => {
    const mockCategories: Category[] = [
      { _id: 1, name: 'Test Category', slug: 'test-category' },
    ];
    service['categoriesSubject'].next(mockCategories);

    service.getNameCategoryBySlug('test-category').subscribe((category) => {
      expect(category).toBeTruthy();
      expect(category.name).toBe('Test Category');
      done();
    });
  });
});
