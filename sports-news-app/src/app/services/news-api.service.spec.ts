import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewsApiService } from './news-api.service';
import { ArticleResponse, Article } from '../models/article.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewsApiService', () => {
  let service: NewsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [NewsApiService],
    });

    service = TestBed.inject(NewsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get articles', () => {
    const mockResponse: ArticleResponse = {
      articles: [
        {
          _id: '1',
          title: 'Test Article',
          content: 'Test Content',
          category: 'Test Category',
          source: 'Test Source',
          description: 'Test Description',
          link: 'http://example.com',
          imageUrl: 'http://example.com/image.jpg',
          pubDate: new Date(),
          categories: ['Test Category'],
          formattedCategories: [
            { _id: 1, name: 'Test Category', slug: 'test-category' },
          ],
          createdAt: new Date(),
        },
      ],
      totalItems: 1,
      totalPages: 1,
      currentPage: 1,
    };

    service.getArticles(1, 10).subscribe((response) => {
      expect(response.articles.length).toBe(1);
      expect(response.articles[0].title).toBe('Test Article');
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/api/articles?page=1&limit=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get article by ID', () => {
    const mockArticle: Article = {
      _id: '1',
      title: 'Test Article',
      content: 'Test Content',
      category: 'Test Category',
      source: 'Test Source',
      description: 'Test Description',
      link: 'http://example.com',
      imageUrl: 'http://example.com/image.jpg',
      pubDate: new Date(),
      categories: ['Test Category'],
      formattedCategories: [
        {
          _id: 1,
          name: 'Test Category',
          slug: 'test-category',
        },
      ],
      createdAt: new Date(),
    };

    service.getArticleById('1').subscribe((article) => {
      expect(article).toBeTruthy();
      expect(article.title).toBe('Test Article');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/articles/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticle);
  });

  it('should get categories', () => {
    const mockCategories: string[] = ['Category1', 'Category2'];

    service.getCategories().subscribe((categories) => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/api/articles/categories'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });
});
