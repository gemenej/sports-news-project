import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ArticleComponent } from './article.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    // Register the locale data for 'uk-UA'
    registerLocaleData(localeUk, 'uk-UA');

    await TestBed.configureTestingModule({
      declarations: [ArticleComponent],
      imports: [HttpClientModule, RouterTestingModule, MatCardModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock params
            queryParams: of({}), // Mock queryParams if used
            paramMap: of({
              get: (key: string) => '123' // Mock paramMap.get if used
            }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123' // Mock paramMap.get if used
              },
              data: {}
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
