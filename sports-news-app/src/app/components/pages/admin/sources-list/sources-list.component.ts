import { Component, OnInit } from "@angular/core";
import { SourceService } from "../../../../services/source.service";
import { Observable, takeUntil } from "rxjs";
import { Source } from "../../../../models/source.model";
import { CategoryService } from "../../../../services/category.service";
import { Category } from "../../../../models/category.model";
import { DialogSourceCreateComponent } from "../../../dialogs/dialog-source-create/dialog-source-create.component";
import { MatDialog } from "@angular/material/dialog";
import { DialogSourceDeleteComponent } from "../../../dialogs/dialog-source-delete/dialog-source-delete.component";
import { Unsub } from "../../../../helpers/unsub.class";
import { DialogSourceUpdateComponent } from "../../../dialogs/dialog-source-update/dialog-source-update.component";

@Component({
  selector: "app-sources-list",
  templateUrl: "./sources-list.component.html",
  styleUrl: "./sources-list.component.scss",
})
export class SourcesListComponent extends Unsub implements OnInit {
  sources$: Observable<Source[]>;
  categories$: Observable<Category[]>;
  settings$: Observable<any>;

  constructor(
    public dialog: MatDialog,
    private sourceService: SourceService,
    private categoryService: CategoryService
  ) {
    super();
    this.sources$ = this.sourceService.sources$;
    this.categories$ = this.categoryService.categories$;
    this.settings$ = this.sourceService.settings$;
  }

  ngOnInit(): void {
    this.sourceService.loadSettings();
    this.settings$.pipe(takeUntil(this.unsubscribe$)).subscribe((settings) => {
      //console.log(settings);
    });
    this.sources$.pipe(takeUntil(this.unsubscribe$)).subscribe((sources) => {
      //console.log(sources);
    });
    this.categories$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((categories) => {
        //console.log(categories);
      });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogSourceCreateComponent, {
      restoreFocus: false,
      data: { name: "", slug: "", url: "", category: "" },
      backdropClass: "backdropBackground",
    });

    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.addSource(result)
        : console.log("The dialog was closed without changes");
    });
  }

  openUpdateDialog(source: Source): void {
    const updatedSource = source;
    const dialogRef = this.dialog.open(DialogSourceUpdateComponent, {
      restoreFocus: false,
      data: {
        name: source.name,
        slug: source.slug,
        url: source.url,
        category: source.category,
        wrapper: source.wrapper,
        selector: source.selector
      },
      backdropClass: "backdropBackground",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        updatedSource.name = result.name;
        updatedSource.slug = result.slug;
        updatedSource.url = result.url;
        updatedSource.category = result.category;
        updatedSource.wrapper = result.wrapper;
        updatedSource.selector = result.selector;
        this.updateSource(updatedSource);
      } else {
        console.log("The dialog was closed without changes");
      }
    });
  }

  openDeleteDialog(category: Category): void {
    const dialogRef = this.dialog.open(DialogSourceDeleteComponent, {
      width: "300px",
      height: "200px",
      restoreFocus: false,
      data: category,
      backdropClass: "backdropBackground",
    });

    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.deleteSource(category._id)
        : console.log("The dialog was closed without changes");
    });
  }

  deleteSource(id: number): void {
    this.sourceService.deleteSource(id);
  }

  trackByFn(index: number, item: Source): number {
    return item._id;
  }

  addSource(source: Source): void {
    this.sourceService.addSource(source);
  }

  updateSource(source: Source): void {
    this.sourceService.updateSource(source);
  }

  startParsing(): void {
    this.sourceService.postStartParsing();
  }

  stopParsing(): void {
    this.sourceService.postStopParsing();
  }
}
