export interface Category {
  _id: number;
  slug: string;
  name: string;
}

export interface CategoryResponse {
  categories: Category[];
  totalItems: number;
}
