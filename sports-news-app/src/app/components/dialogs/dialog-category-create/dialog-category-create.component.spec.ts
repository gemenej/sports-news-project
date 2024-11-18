import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogCategoryCreateComponent } from './dialog-category-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../models/category.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogCategoryCreateComponent', () => {
  let component: DialogCategoryCreateComponent;
  let fixture: ComponentFixture<DialogCategoryCreateComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogCategoryCreateComponent>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatIconModule,
        BrowserAnimationsModule,
        DialogCategoryCreateComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { _id: 1, name: 'Test Category' } as Category,
        },
      ],
    }).compileComponents();

    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<DialogCategoryCreateComponent>
    >;

    fixture = TestBed.createComponent(DialogCategoryCreateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.categoryForm.contains('name')).toBeTruthy();
    expect(component.categoryForm.contains('slug')).toBeTruthy();
  });

  it('should close the dialog with "cancel" on cancel', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith('cancel');
  });

  it('should close the dialog with form data on valid submit', () => {
    component.categoryForm.setValue({ name: 'Test Name', slug: 'test-slug' });
    component.onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith({
      name: 'Test Name',
      slug: 'test-slug',
    });
  });

  it('should log an error on invalid form submit', () => {
    spyOn(console, 'error');
    component.categoryForm.setValue({ name: '', slug: '' });
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });
});
