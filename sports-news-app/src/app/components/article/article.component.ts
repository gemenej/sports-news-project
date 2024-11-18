import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewsApiService } from '../../services/news-api.service';
import { Article } from '../../models/article.model';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  categories$: Observable<Category[]>;
  articleId: string = '';
  article: Article = {
    _id: '',
    title: '',
    content: '',
    description: '',
    link: '',
    source: '',
    category: '',
    categories: [],
    formattedCategories: [],
    imageUrl: '',
    createdAt: new Date(),
    pubDate: new Date(),
  };
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router, private newsApiService: NewsApiService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = this.route.snapshot.paramMap.get('_id') || '';
    });
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    this.newsApiService.getArticleById(this.articleId).subscribe((article: Article) => {
      this.article = this.formatArticle(article);
    });
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
