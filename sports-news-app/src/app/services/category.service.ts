import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, CategoryResponse } from '../models/category.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly API_URL = 'http://localhost:3000/api';
  private readonly CATEGORIES_URL = `${this.API_URL}/categories`;

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loadCategories();
  }

  // getCategories(): Observable<CategoryResponse> {
  //   return this.http.get<CategoryResponse>(this.CATEGORIES_URL);
  // }

  loadCategories(): void {
    this.http.get<CategoryResponse>(this.CATEGORIES_URL).subscribe(
      data => {
        this.categoriesSubject.next(data.categories);
      },
      error => {
        console.error('Error loading sources:', error);
        this.snackBar.open('Something happened!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  addCategory(category: Category): void {
    this.http.post<Category>(this.CATEGORIES_URL, category).subscribe(
      (data) => {
        this.loadCategories();
        this.snackBar.open(`Category ${category.name} added successfully`, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
      error => {
        console.error('Error adding category:', error);
        this.snackBar.open(`Error adding ${category.name} category`, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  deleteCategory(id: number): void {
    this.http.delete(`${this.CATEGORIES_URL}/${id}`).subscribe(
      (data) => {
        this.loadCategories();
        this.snackBar.open('Category deleted successfully', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
      error => {
        console.error('Error deleting category:', error);
        this.snackBar.open('Error deleting category', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  updateCategory(category: Category): void {
    this.http.put<Category>(`${this.CATEGORIES_URL}/${category._id}`, category).subscribe(
      (data) => {
        this.loadCategories();
        this.snackBar.open(`Category ${category.name} updated successfully`, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
      error => {
        console.error('Error updating category:', error);
        this.snackBar.open('Error updating category', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  getCategory(id: number): Category | undefined {
    return this.categoriesSubject.value.find(category => category._id === id);
  }

  getNameCategoryBySlug(slug: string): Observable<Category> {
    return new Observable((observer) => {
      this.categories$.subscribe((categories) => {
        const category = categories.find((cat) => cat.slug === slug);
        if (category) {
          observer.next(category);
        }
      });
    });
  }

}
