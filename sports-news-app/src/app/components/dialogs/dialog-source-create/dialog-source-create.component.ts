import { Component, Inject, OnDestroy, OnInit, forwardRef } from '@angular/core';
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
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Source } from '../../../models/source.model';
import { Observable, Subject } from 'rxjs';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-source-create',
  templateUrl: './dialog-source-create.component.html',
  styleUrl: './dialog-source-create.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DialogSourceCreateComponent),
      multi: true,
    }
  ],
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
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    TranslatePipe,
    TranslateDirective
  ]
})
export class DialogSourceCreateComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  private destroy$ = new Subject<void>();

  sourceForm: FormGroup;
  errorNameMessage = '';
  errorSlugMessage = '';
  errorUrlMessage = '';
  errorCategoryMessage = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogSourceCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Source
  ) {
    this.categories$ = this.categoryService.categories$;
    this.sourceForm = this.fb.group({
      name: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      category: new FormControl(null, Validators.required),
      wrapper: new FormControl(''),
      selector: new FormGroup({
        selector: new FormControl(''),
        attribute: new FormControl(''),
        value: new FormControl(''),
      })
    });
  }

  ngOnInit(): void {
    this.categories$.subscribe((categories) => {
      //console.log(categories);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.categories$.subscribe().unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.sourceForm.valid) {
      this.dialogRef.close(this.sourceForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  get name(): FormControl {
    return this.sourceForm.get('name') as FormControl;
  }

  get slug(): FormControl {
    return this.sourceForm.get('slug') as FormControl;
  }

  get url(): FormControl {
    return this.sourceForm.get('url') as FormControl;
  }

  get category(): FormControl {
    return this.sourceForm.get('category') as FormControl;
  }

  get wrapper(): FormControl {
    return this.sourceForm.get('wrapper') as FormControl;
  }

  get selectorGroup(): FormGroup {
    return this.sourceForm.get('selector') as FormGroup;
  }

  get selector(): FormControl {
    return this.selectorGroup.get('selector') as FormControl;
  }

  get attribute(): FormControl {
    return this.selectorGroup.get('attribute') as FormControl;
  }

  get value(): FormControl {
    return this.selectorGroup.get('value') as FormControl;
  }

  set name(value: string) {
    this.name.setValue(value);
  }

  set slug(value: string) {
    this.slug.setValue(value);
  }

  set url(value: string) {
    this.url.setValue(value);
  }

  set category(value: string) {
    this.category.setValue(value);
  }

  set wrapper(value: string) {
    this.wrapper.setValue(value);
  }

  set selector(value: string) {
    this.selector.setValue(value);
  }

  set attribute(value: string) {
    this.attribute.setValue(value);
  }

  set selectorGroup(value: FormGroup) {
    this.selectorGroup.setValue(value);
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

  updateUrlErrorMessage() {
    if (this.url.hasError('required')) {
      this.errorUrlMessage = 'You must enter a value';
    } else {
      this.errorUrlMessage = '';
    }
  }

  updateCategoryErrorMessage() {
    if (this.category.hasError('required')) {
      this.errorCategoryMessage = 'You must choose a category';
    } else {
      this.errorCategoryMessage = '';
    }
  }
}
