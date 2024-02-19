import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs';

declare let fbq: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'clickstore-fronted';
  private idnegocio: string[] = [];
  private pixelnegocio: string = '';

  constructor(private router: Router,
    private viewportScroller: ViewportScroller) {
    this.getScrollEvents();
    this.getNavEndEvents();
  }

  getScrollEvents() {

    const scrollEvents = this.router.events.pipe(
      filter(e => e instanceof Scroll)
    );

    scrollEvents.subscribe((e: any) => {
      setTimeout(() => {
        if (e.position) { this.viewportScroller.scrollToPosition(e.position); }
      });
    });
  }

  getNavEndEvents() {

    const navEndEvents = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );

    navEndEvents.subscribe((event: NavigationEnd) => {
    });
  }

}
