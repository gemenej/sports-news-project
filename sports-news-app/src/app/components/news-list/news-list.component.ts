import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { NewsApiService } from '../../services/news-api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Unsub } from '../../helpers/unsub.class';
import { customizePaginator } from '../../helpers';
import { Article } from '../../models/article.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
  providers: [MatPaginator],
})
export class NewsListComponent
  extends Unsub
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() type: string = '';
  @Input() typeValue: string = '';
  @Input() title: string = '';

  articles$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  categories$: Observable<Category[]>;
  loading: boolean = true;

  totalItems = 0;
  pageSize = 12;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private newsApiServices: NewsApiService, private categoryService: CategoryService, private paginator: MatPaginator) {
    super();
    // change labels of paginator
    customizePaginator(this.paginator._intl);
    this.categories$ = this.categoryService.categories$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['type']?.currentValue !== changes['type']?.previousValue
    ) {
      this.currentPage = 0;
      this.loading = true;
      this.getArticles();
    }

    if (
      changes['typeValue']?.currentValue !== changes['typeValue']?.previousValue
    ) {
      this.currentPage = 0;
      this.loading = true;
      this.getArticles();
    }
    // scroll to top
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.articles$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      //console.log(data);
    });

  }

  ngAfterViewInit() {
    this.getArticles();
  }

  getArticles() {
    this.newsApiServices
      .getArticles(
        this.currentPage + 1,
        this.pageSize,
        this.type,
        this.typeValue
      )
      .subscribe((data) => {
        const articles = data.articles.map((article: Article) => {
            return this.formatArticle(article);
          });
        this.articles$.next(articles);
        this.totalItems = data.totalItems;
        this.loading = false;
      });
  }

  pageChanged(ev: PageEvent) {
    this.currentPage = ev.pageIndex;
    this.pageSize = ev.pageSize;
    this.loading = true;
    this.getArticles();
  }

  formatArticle(article: Article){
    const categories: Category[] = [];
    article.categories.forEach((category: string) => {
      // get category by name from categories$
      this.categories$.subscribe((cats) => {
        const cat = cats.find((c) => c.slug === category);
        if (cat) {
          categories.push(cat);
        }
      });
    });
    return {
      ...article,
      formattedCategories: categories,
    };
  }

}
