import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, length: number): any {
    if ((value as string).length > length) {
      return (value as string).substr(0, length) + ' ...';
    }
    return value;
  }

}
