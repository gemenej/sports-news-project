import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translDate',
  pure: false
})
export class TranslDatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: any, pattern: string = 'mediumDate'): any {
    const datePipe: DatePipe = new DatePipe(this.translate.defaultLang);
    return datePipe.transform(value, pattern);
  }

}
