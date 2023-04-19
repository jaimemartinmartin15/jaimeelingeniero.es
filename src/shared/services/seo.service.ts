import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly activatedRoute: ActivatedRoute,
    private readonly metaService: Meta,
    private readonly router: Router
  ) {}

  public listenNavigationEvents() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => {
          let route = this.activatedRoute;
          while (route.firstChild != null) route = route.firstChild;
          return route.data;
        })
      )
      .subscribe(({ metaTags }) => {
        this.updateDescription(metaTags?.description);
        this.updateKeyworkds(metaTags?.keywords);
        this.setCanonical();
      });

    this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe(() => {
      this.metaService.removeTag('name="description"');
      this.metaService.removeTag('name="keywords"');
    });
  }

  public updateDescription(description: string) {
    if (description != undefined) {
      this.metaService.updateTag({ name: 'description', content: description });
    }
  }

  public updateKeyworkds(keyworkds: string[]) {
    if (keyworkds != undefined) {
      this.metaService.updateTag({ name: 'keywords', content: keyworkds.join(', ') });
    }
  }

  public setCanonical() {
    if (!location.hostname.includes('www') || location.protocol === 'http') {
      const canonicalLink = this.document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = `https://www.jaimeelingeniero.es${location.href.substring(location.origin.length)}`;
      this.document.head.appendChild(canonicalLink);
    }
  }
}
