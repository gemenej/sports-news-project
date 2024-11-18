import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogCategoryUpdateComponent } from './dialog-category-update.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogCategoryUpdateComponent', () => {
  let component: DialogCategoryUpdateComponent;
  let fixture: ComponentFixture<DialogCategoryUpdateComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogCategoryUpdateComponent>>;

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
        BrowserAnimationsModule,
        DialogCategoryUpdateComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { _id: 1, name: 'Test Category', slug: 'test_category' } as Category,
        },
      ],
    }).compileComponents();

    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<DialogCategoryUpdateComponent>
    >;

    fixture = TestBed.createComponent(DialogCategoryUpdateComponent);
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
