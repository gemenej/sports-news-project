import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SourceService } from './source.service';
import { Source } from '../models/source.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SourceService', () => {
  let service: SourceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [SourceService],
    });

    service = TestBed.inject(SourceService);
    httpMock = TestBed.inject(HttpTestingController);

    // Handle the initial loadSources call from constructor
    const req = httpMock.expectOne('http://localhost:3000/api/sources');
    req.flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load sources', () => {
    const mockSources: Source[] = [{
      _id: 1,
      name: 'Test Source',
      slug: 'updated-source',
      url: 'http://example.com',
      category: 'test',
      wrapper: 'test',
      selector: { selector: 'test',
        attribute: 'test',
        value: 'test'
      },
    }];

    service.loadSources();

    const req = httpMock.expectOne('http://localhost:3000/api/sources');
    expect(req.request.method).toBe('GET');
    req.flush(mockSources);

    service.sources$.subscribe((sources) => {
      expect(sources.length).toBe(1);
      expect(sources[0].name).toBe('Test Source');
    });
  });

  it('should add a source', fakeAsync(() => {
    const newSource: Source = {
      _id: 2,
      name: 'New Source',
      slug: 'updated-source',
      url: 'http://example.com',
      category: 'test',
      wrapper: 'test',
      selector: { selector: 'test',
        attribute: 'test',
        value: 'test'
      },
    };;

    service.addSource(newSource);

    // Handle POST request
    const postReq = httpMock.expectOne('http://localhost:3000/api/sources');
    expect(postReq.request.method).toBe('POST');
    postReq.flush(newSource);

    // Handle subsequent GET request from loadSources
    const getReq = httpMock.expectOne('http://localhost:3000/api/sources');
    expect(getReq.request.method).toBe('GET');
    getReq.flush([newSource]);

    // Handle the snackbar timer
    tick(3000);

    service.sources$.subscribe((sources) => {
      expect(sources.length).toBe(1);
      expect(sources[0].name).toBe('New Source');
    });
  }));

  it('should delete a source', fakeAsync(() => {
    const sourceId = 1;

    service.deleteSource(sourceId);

    // Handle DELETE request
    const deleteReq = httpMock.expectOne(
      `http://localhost:3000/api/sources/${sourceId}`
    );
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});

    // Handle subsequent GET request from loadSources
    const getReq = httpMock.expectOne('http://localhost:3000/api/sources');
    expect(getReq.request.method).toBe('GET');
    getReq.flush([]);

    // Handle the snackbar timer
    tick(3000);

    service.sources$.subscribe((sources) => {
      expect(sources.length).toBe(0);
    });
  }));

  it('should update a source', fakeAsync(() => {
    const updatedSource: Source = {
      _id: 1,
      name: 'Updated Source',
      slug: 'updated-source',
      url: 'http://example.com',
      category: 'test',
      wrapper: 'test',
      selector: { selector: 'test',
        attribute: 'test',
        value: 'test'
      },
    };

    service.updateSource(updatedSource);

    // Handle PUT request
    const putReq = httpMock.expectOne(
      `http://localhost:3000/api/sources/${updatedSource._id}`
    );
    expect(putReq.request.method).toBe('PUT');
    putReq.flush(updatedSource);

    // Handle subsequent GET request from loadSources
    const getReq = httpMock.expectOne('http://localhost:3000/api/sources');
    expect(getReq.request.method).toBe('GET');
    getReq.flush([updatedSource]);

    // Handle the snackbar timer
    tick(3000);

    service.sources$.subscribe((sources) => {
      expect(sources.length).toBe(1);
      expect(sources[0].name).toBe('Updated Source');
    });
  }));
});
