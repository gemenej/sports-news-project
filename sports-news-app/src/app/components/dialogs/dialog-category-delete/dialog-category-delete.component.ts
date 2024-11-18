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
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../../models/category.model';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-category-delete',
  templateUrl: './dialog-category-delete.component.html',
  styleUrl: './dialog-category-delete.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    TranslatePipe,
    TranslateDirective,
  ],
})
export class DialogCategoryDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCategoryDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {}

  submit() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
