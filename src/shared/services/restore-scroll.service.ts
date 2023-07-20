import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestoreScrollService {
  private scrollMap = new Map<string, { position: [number, number] }>();

  public constructor(private readonly router: Router, private viewportScroller: ViewportScroller) {}

  public listenScrollRestoration() {
    this.viewportScroller.setHistoryScrollRestoration('manual');

    this.router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe(() => {
      // save scroll position before navigation
      const basePath = new URL(this.router.url, location.origin).pathname;
      this.scrollMap.set(basePath, { position: this.viewportScroller.getScrollPosition() });
    });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      // restore scroll position after navigation
      const basePath = new URL(this.router.url, location.origin).pathname;
      if (!this.router.url.includes('#')) {
        if (this.scrollMap.has(basePath)) {
          setTimeout(() => {
            this.viewportScroller.scrollToPosition(this.scrollMap.get(basePath)!.position);
          }, 20);
        } else {
          // It is a new page. Scroll here instead of using scrollPositionRestoration in RouterModule
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      } else {
        const anchor = new URL(this.router.url, location.origin).hash;
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(anchor);
        }, 20);
      }
    });
  }
}
