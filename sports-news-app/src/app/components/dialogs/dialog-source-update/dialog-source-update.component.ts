import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Source } from '../../../models/source.model';
import { CategoryService } from '../../../services/category.service';
import { Observable, takeUntil } from 'rxjs';
import { Category } from '../../../models/category.model';
import { Unsub } from '../../../helpers/unsub.class';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-source-update',
  templateUrl: './dialog-source-update.component.html',
  styleUrl: './dialog-source-update.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
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
export class DialogSourceUpdateComponent extends Unsub implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogSourceUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Source
  ) {
    super();
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit(): void {
    this.categories$.pipe(takeUntil(this.unsubscribe$)).subscribe((categories) => {
      //console.log(categories);
    });
  }

  submit() {
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
