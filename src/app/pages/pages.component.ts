import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SettingServiceService } from '../services/setting-service.service';
import { WebsocketService } from '../services/sockets.service';

declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  public onLine: boolean
  public year = new Date().getFullYear();

  constructor( private settingServiceService: SettingServiceService,
               public ws: WebsocketService ) { }

  ngOnInit() {
    customInitFunction();
  }

}
