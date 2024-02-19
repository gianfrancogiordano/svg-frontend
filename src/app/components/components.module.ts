import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper/cropper.component';
import { PipesModule } from '../pipes/pipes.module';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EditorComponent } from './editor/editor.component';
import { RouterModule } from '@angular/router';


export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    CropperComponent,
    EditorComponent
  ],
  exports: [
    CropperComponent,
    EditorComponent
  ],
  imports: [
    PipesModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ComponentsModule { }
