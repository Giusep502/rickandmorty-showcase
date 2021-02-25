import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'handleNull',
})
export class HandleNullPipe implements PipeTransform {
  transform(value: string): string {
    return value || '-';
  }
}
