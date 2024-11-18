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
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-category-update',
  templateUrl: './dialog-category-update.component.html',
  styleUrl: './dialog-category-update.component.scss',
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
    MatOptionModule,
    MatSelectModule,
    TranslatePipe,
    TranslateDirective
  ],
})
export class DialogCategoryUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCategoryUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {}

  submit() {
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
