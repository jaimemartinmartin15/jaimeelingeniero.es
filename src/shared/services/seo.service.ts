import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

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
          // Puntuaciones page is an exception here
          while (route.firstChild != null && route.routeConfig?.title !== 'Puntuaciones') route = route.firstChild;
          return route.data;
        })
      )
      .subscribe(({ metaTags }) => {
        this.updateDescription(metaTags?.description);
        this.updateKeyworkds(metaTags?.keywords);
        this.setFavIcons(metaTags?.favIcon);
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

  public setFavIcons(favIconPath: string) {
    const linkElementsFavIcon = this.document.querySelectorAll('link[rel*="icon"]');
    for (let i = 0; i < linkElementsFavIcon.length; i++) {
      let linkElement = linkElementsFavIcon.item(i) as HTMLLinkElement;
      const size = linkElement.sizes.value.split('x')[0];
      linkElement.href = favIconPath != undefined ? favIconPath.replaceAll('{size}', size) : `assets/favicons/default/favicon-${size}x${size}.png`;
    }
  }

  public setCanonical() {
    // In Mueller’s words: “It’s a great practice to have a self-referencing canonical but it’s not critical.”
    const canonicalLink = (this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement) || this.document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = `https://www.jaimeelingeniero.es${location.href.substring(location.origin.length)}`;
    this.document.head.appendChild(canonicalLink); // it won´t be duplicated 😉 (read docs)
  }
}
