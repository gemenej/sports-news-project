import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article, ArticleResponse } from '../models/article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getArticles(currentPage: number, pageSize: number, type?: string, value?: string): Observable<ArticleResponse> {
    let params = new HttpParams()
        .set('page', currentPage.toString())
        .set('limit', pageSize.toString());

    if (type && value) {
        params = params.set(type.toString(), value.toString());
    }
    return this.http.get<ArticleResponse>(`${this.API_URL}/articles`, { params });
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.API_URL}/articles/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/articles/categories`);
  }

  getSources(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/articles/sources`);
  }
}
