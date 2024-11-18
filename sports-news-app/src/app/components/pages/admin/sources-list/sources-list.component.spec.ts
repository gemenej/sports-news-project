import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesListComponent } from './sources-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

describe('SourcesListComponent', () => {
  let component: SourcesListComponent;
  let fixture: ComponentFixture<SourcesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatGridListModule, MatIconModule],
      declarations: [SourcesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
