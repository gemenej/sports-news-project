import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { DialogSourceCreateComponent } from './dialog-source-create.component';
import { CategoryService } from '../../../services/category.service';
import { Source } from '../../../models/source.model';
import { Category } from '../../../models/category.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogSourceCreateComponent', () => {
  let component: DialogSourceCreateComponent;
  let fixture: ComponentFixture<DialogSourceCreateComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogSourceCreateComponent>>;

  beforeEach(async () => {
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', [], {
      categories$: of([{ _id: 1, name: 'Category 1', slug: 'category-1' }])
    });
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        BrowserAnimationsModule,
        DialogSourceCreateComponent
      ],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { selector: { selector: '' } } as Source }
      ]
    }).compileComponents();

    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DialogSourceCreateComponent>>;

    fixture = TestBed.createComponent(DialogSourceCreateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.sourceForm).toBeDefined();
    expect(component.sourceForm.valid).toBeFalse();
  });

  it('should validate form fields', () => {
    component.name.setValue('Test Source');
    component.slug.setValue('test-source');
    component.url.setValue('http://test.com');
    component.category.setValue('1');
    expect(component.sourceForm.valid).toBeTrue();
  });

  it('should close the dialog with form data on submit', () => {
    component.name.setValue('Test Source');
    component.slug.setValue('test-source');
    component.url.setValue('http://test.com');
    component.category.setValue('1');
    component.onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith(component.sourceForm.value);
  });

  it('should close the dialog without data on cancel', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it('should subscribe to categories$ and log categories', () => {
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith([{ _id: 1, name: 'Category 1', slug: 'category-1' }]);
  });

  it('should unsubscribe from categories$ on destroy', () => {
    const unsubscribeSpy = spyOn(component.categories$, 'subscribe').and.callThrough();
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
