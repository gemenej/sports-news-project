export interface SelectorItem {
  selector: string;
  attribute: string;
  value: string;
}

export interface Source {
  _id: number;
  slug: string;
  name: string;
  url: string;
  category: string;
  wrapper: string;
  selector: SelectorItem;
}
