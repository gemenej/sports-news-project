import { Component, Input } from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() article!: Article;

  constructor() { }

}
