import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogSourceUpdateComponent } from './dialog-source-update.component';
import { CategoryService } from '../../../services/category.service';
import { Source } from '../../../models/source.model';
import { Category } from '../../../models/category.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogSourceUpdateComponent', () => {
  let component: DialogSourceUpdateComponent;
  let fixture: ComponentFixture<DialogSourceUpdateComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogSourceUpdateComponent>>;

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
        MatOptionModule,
        MatSelectModule,
        BrowserAnimationsModule,
        DialogSourceUpdateComponent
      ],
      //declarations: [DialogSourceUpdateComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { selector: { selector: '' } } as Source }
      ]
    }).compileComponents();

    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DialogSourceUpdateComponent>>;

    fixture = TestBed.createComponent(DialogSourceUpdateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to categories$ and log categories', () => {
    spyOn(console, 'log');

    component.ngOnInit(); // Call ngOnInit to trigger the subscription
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith([{ _id: 1, name: 'Category 1', slug: 'category-1' }]);
  });

  it('should close the dialog with data on submit', () => {
    component.submit();
    expect(dialogRef.close).toHaveBeenCalledWith(component.data);
  });

  it('should close the dialog with "cancel" on onNoClick', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith('cancel');
  });
});


