import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { CutstringPipe } from './cutstring.pipe';
import { NoSanitizePipe } from './no-sanitize.pipe';

@NgModule({
  declarations: [ImagenPipe, CutstringPipe, NoSanitizePipe],
  exports: [ImagenPipe, CutstringPipe, NoSanitizePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
