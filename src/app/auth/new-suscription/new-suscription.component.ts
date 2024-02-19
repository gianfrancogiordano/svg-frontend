import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-suscription',
  templateUrl: './new-suscription.component.html',
  styleUrls: ['./new-suscription.component.css']
})
export class NewSuscriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }

}
