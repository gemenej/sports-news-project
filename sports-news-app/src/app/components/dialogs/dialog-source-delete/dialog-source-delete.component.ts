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
import { Source } from '../../../models/source.model';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-source-delete',
  templateUrl: './dialog-source-delete.component.html',
  styleUrl: './dialog-source-delete.component.scss',
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
    TranslateDirective
  ]
})
export class DialogSourceDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSourceDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Source
  ) {}

  submit() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
