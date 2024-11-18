import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../../models/category.model';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-category-create',
  templateUrl: './dialog-category-create.component.html',
  styleUrl: './dialog-category-create.component.scss',
  standalone: true,
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
    TranslatePipe,
    TranslateDirective,
  ],
})
export class DialogCategoryCreateComponent {
  categoryForm: FormGroup;

  errorNameMessage = '';
  errorSlugMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCategoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.categoryForm = this.fb.group({
      name: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  get name(): FormControl {
    return this.categoryForm.get('name') as FormControl;
  }

  get slug(): FormControl {
    return this.categoryForm.get('slug') as FormControl;
  }

  set name(value: string) {
    this.name.setValue(value);
  }

  set slug(value: string) {
    this.slug.setValue(value);
  }

  updateNameErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorNameMessage = 'You must enter a value';
    } else {
      this.errorNameMessage = '';
    }
  }

  updateSlugErrorMessage() {
    if (this.slug.hasError('required')) {
      this.errorSlugMessage = 'You must enter a value';
    } else {
      this.errorSlugMessage = '';
    }
  }
}
