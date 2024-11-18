import { Category } from "./category.model";

export interface Article {
  _id: string;
  title: string;
  content: string;
  description: string;
  category: string;
  categories: string[];
  formattedCategories: Category[];
  link: string;
  source: string;
  imageUrl: string;
  createdAt: Date;
  pubDate: Date;
}

export interface ArticleResponse {
  articles: Article[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export enum CategoryEnum {
  GENERAL_SPORTS = 'General Sports',
  FOOTBALL = 'Football',
  BASKETBALL = 'Basketball',
  BASEBALL = 'Baseball',
  TENNIS = 'Tennis',
  GOLF = 'Golf',
  BOXING = 'Boxing',
  MMA = 'MMA',
  CYCLING = 'Cycling',
  RACING = 'Racing',
  WRESTLING = 'Wrestling',
  VOLLEYBALL = 'Volleyball',
}
