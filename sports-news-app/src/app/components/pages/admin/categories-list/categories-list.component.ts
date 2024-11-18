import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Observable, takeUntil } from 'rxjs';
import { Category } from '../../../../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryUpdateComponent } from '../../../dialogs/dialog-category-update/dialog-category-update.component';
import { DialogCategoryDeleteComponent } from '../../../dialogs/dialog-category-delete/dialog-category-delete.component';
import { DialogCategoryCreateComponent } from '../../../dialogs/dialog-category-create/dialog-category-create.component';
import { Unsub } from '../../../../helpers/unsub.class';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent extends Unsub implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {
    super();
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit(): void {
    this.categories$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((categories) => {
        //console.log(categories);
      });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id);
  }

  trackByFn(index: number, item: Category): number {
    return item._id;
  }

  addCategory(category: Category): void {
    this.categoryService.addCategory(category);
  }

  updateCategory(category: Category): void {
    this.categoryService.updateCategory(category);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogCategoryCreateComponent, {
      data: { name: '', slug: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.addCategory(result)
        : console.log('The dialog was closed without changes');
    });
  }

  openUpdateDialog(category: Category): void {
    const updateCategory = category;
    const dialogRef = this.dialog.open(DialogCategoryUpdateComponent, {
      restoreFocus: false,
      data: { name: category.name, slug: category.slug },
      backdropClass: "backdropBackground",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        updateCategory.name = result.name;
        updateCategory.slug = result.slug;
        this.updateCategory(updateCategory);
      } else {
        console.log('The dialog was closed without changes');
      }
    });
  }

  openDeleteDialog(category: Category): void {
    const dialogRef = this.dialog.open(DialogCategoryDeleteComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.deleteCategory(category._id)
        : console.log('The dialog was closed without changes');
    });
  }
}
