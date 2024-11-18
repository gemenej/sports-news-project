import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { SourceService } from '../../services/source.service';
import { Category } from '../../models/category.model';
import { Source } from '../../models/source.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  sources$: Observable<Source[]>;

  loading: boolean = true;

  constructor(private categoryService: CategoryService, private sourceService: SourceService) {
    this.sources$ = this.sourceService.sources$;
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit() {
    this.categories$.subscribe(categories => {
      //console.log(categories);
    });
    this.sources$.subscribe(sources => {
      //console.log(sources);
    });
  }

  ngOnDestroy() {
    this.categories$.subscribe().unsubscribe();
    this.sources$.subscribe().unsubscribe();
  }

  getNewsByTag(category: string, type: string) {
    console.log(category, type);
  }
}
