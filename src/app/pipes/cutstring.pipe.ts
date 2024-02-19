import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutstring'
})
export class CutstringPipe implements PipeTransform {

  transform(string: string, slice: number, ...args: any[]): any {

    let newString = string.slice(0, slice);

    if( string.length > slice ) {
      newString = newString + '...';
    }

    return newString;
  }

}
