import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(img: string, tipo: string, ...args: any[]): any {

    const urlImg = `${base_url}/fileupload/${tipo}/${img}`;

    if (urlImg.includes('no-img.png') || urlImg.includes('noimg.png') || urlImg.includes('noimg.jpg') || urlImg.includes('noimg.jpg')) {

      return `/assets/images/no-img.png`;
    }

    if (img) {
      return `${base_url}/fileupload/${tipo}/${img}`;

    } else {
      return `/assets/images/no-img.png`;

    }

  }

}
