import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogSourceDeleteComponent } from './dialog-source-delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

describe('DialogSourceDeleteComponent', () => {
  let component: DialogSourceDeleteComponent;
  let fixture: ComponentFixture<DialogSourceDeleteComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogSourceDeleteComponent>>;

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
        DialogSourceDeleteComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, name: 'Test Source' } }
      ]
    }).compileComponents();

    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DialogSourceDeleteComponent>>;

    fixture = TestBed.createComponent(DialogSourceDeleteComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with true on submit', () => {
    component.submit();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog without data on cancel', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith();
  });
});
