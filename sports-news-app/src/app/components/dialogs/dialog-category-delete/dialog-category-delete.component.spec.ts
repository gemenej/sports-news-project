import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogCategoryDeleteComponent } from './dialog-category-delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Category } from '../../../models/category.model';

describe('DialogCategoryDeleteComponent', () => {
  let component: DialogCategoryDeleteComponent;
  let fixture: ComponentFixture<DialogCategoryDeleteComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogCategoryDeleteComponent>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        DialogCategoryDeleteComponent,
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
      MatDialogRef<DialogCategoryDeleteComponent>
    >;

    fixture = TestBed.createComponent(DialogCategoryDeleteComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with "cancel" on cancel', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith('cancel');
  });
});
