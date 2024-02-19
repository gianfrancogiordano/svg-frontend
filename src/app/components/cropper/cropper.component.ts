import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent implements OnInit, AfterViewInit {

  @ViewChild('image', { static: false })
  public imageElement: ElementRef;

  public cropper: Cropper;

  @Input()
  public imageUrl: string = 'assets/images/big/noimg.png';

  @Input()
  public cropperOptions: any = {
    dragMode: 'move',
    aspectRatio: 1/1,
    autoCropArea: 0.6
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cropper = new Cropper(this.imageElement.nativeElement, this.cropperOptions);
  }

}
