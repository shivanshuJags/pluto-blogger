import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform<T>(items: T[] = [], currentPage: number = 1, itemsPerPage: number = 5): T[] {
    if (!items || items.length === 0) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }

}
