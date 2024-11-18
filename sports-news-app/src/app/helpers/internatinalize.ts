// helpers.ts
import { MatPaginatorIntl } from '@angular/material/paginator';

export function customizePaginator(paginator: MatPaginatorIntl): void {
  paginator.itemsPerPageLabel = 'Статей на сторінці';
  paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 з ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} з ${length}`;
  };
}
