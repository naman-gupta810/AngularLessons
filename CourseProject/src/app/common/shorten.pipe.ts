import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, maxLength?: number): any {
    if (maxLength === undefined) {
      maxLength = 25;
    }
    if (value !== null && value !== undefined && (value as string).length > maxLength) {
      return (value as string).substr(0, maxLength) + '...';
    }
    return value;
  }
}
