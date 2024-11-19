import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { Source } from '../models/source.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  private readonly API_URL = 'http://localhost:3000/api';
  private readonly SOURCES_URL = `${this.API_URL}/sources`;
  private readonly SETTINGS_URL = `${this.API_URL}/settings`;

  private sourcesSubject = new BehaviorSubject<Source[]>([]);
  sources$ = this.sourcesSubject.asObservable();

  private settingsSubject = new BehaviorSubject<any>({});
  settings$ = this.settingsSubject.asObservable();

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loadSources();
  }

  loadSources(): void {
    this.http.get<Source[]>(this.SOURCES_URL).subscribe(
      sources => {
        this.sourcesSubject.next(sources);
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

  addSource(source: Source): void {
    this.http.post<Source>(this.SOURCES_URL, source).subscribe(
      (data) => {
        this.loadSources();
        this.snackBar.open(`Source ${source.name} added successfully`, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
      error => {
        console.error('Error adding source:', error);
        this.snackBar.open('Something happened!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  deleteSource(id: number): void {
    this.http.delete(`${this.SOURCES_URL}/${id}`).subscribe(
      () => {
        this.loadSources();
        this.snackBar.open(`Source with id ${id} deleted successfully`, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
      error => {
        console.error('Error deleting source:', error);
        this.snackBar.open('Something happened!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  updateSource(source: Source): void {
    this.http.put<Source>(`${this.SOURCES_URL}/${source._id}`, source).subscribe(
      () => {
        this.loadSources();
        this.snackBar.open(`Source ${source.name} updated successfully`, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
      error => {
        console.error('Error updating source:', error);
        this.snackBar.open('Something happened!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  loadSettings(): void {
    this.http.get<any>(`${this.SETTINGS_URL}`).subscribe(
      settings => {
        this.settingsSubject.next(settings);
      },
      error => {
        console.error('Error loading settings:', error);
        this.snackBar.open('Something happened!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  postStartParsing(): void {
    this.http.post(`${this.SOURCES_URL}/parse`, {}).subscribe(
      () => {
        this.loadSettings();
        this.snackBar.open('Parsing started', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000, 
        });
        timer(3000).subscribe(() => {
          // redirect to home page after 3 seconds with reloading the page
          window.location.href = '/';
        });
      },
      error => {
        console.error('Error starting parsing:', error);
        this.snackBar.open('Something happened!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }

  postStopParsing(): void {
    this.http.post(`${this.SOURCES_URL}/stop`, {}).subscribe(
      () => {
        this.loadSettings();
        this.snackBar.open('Parsing stopped', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
      error => {
        console.error('Error stopping parsing:', error);
        this.snackBar.open('Something happened!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    );
  }
}
