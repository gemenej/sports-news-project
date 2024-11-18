import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCardComponent } from './news-card.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        MatCardModule,
        MatChipsModule
      ],
      declarations: [NewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;

    // Provide a mock article object
    component.article = {
      imageUrl: 'https://example.com/image.jpg',
      title: 'Sample Title',
      source: 'Sample Source',
      pubDate: new Date(),
      description: 'Sample Description',
      formattedCategories: [{ _id: 123, name: 'Category1', slug: 'category1' }],
      content: 'Sample Content',
      category: 'Category1',
      categories: ['Category1'],
      link: 'https://example.com',
      createdAt: new Date(),
      _id: '123'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
