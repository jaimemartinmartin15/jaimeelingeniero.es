import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pages-games',
  template: '<router-outlet></router-outlet>',
  styles: [':host{display: block; height: 100vh}'],
})
export class PagesGamesComponent implements OnInit, OnDestroy {
  public constructor(private readonly metaService: Meta, @Inject(DOCUMENT) private document: Document) {}

  public ngOnInit(): void {
    // TODO: move also to seo service
    // set only the icon when saving in home screen mobile (not the one with type="image/x-icon")
    const linkElementsFavIcon = this.document.getElementsByClassName('favIcon');
    for (let i = 0; i < linkElementsFavIcon.length; i++) {
      let linkElement = linkElementsFavIcon.item(i) as HTMLLinkElement;
      const size = linkElement.sizes.value.split('x')[0];
      linkElement.href = `assets/favicons/puntuaciones/favicon-${size}x${size}.png`;
    }
  }

  public ngOnDestroy(): void {
    // TODO: move also to seo service
    // set default favicons again
    const linkElementsFavIcon = this.document.getElementsByClassName('favIcon');
    for (let i = 0; i < linkElementsFavIcon.length; i++) {
      let linkElement = linkElementsFavIcon.item(i) as HTMLLinkElement;
      const size = linkElement.sizes.value.split('x')[0];
      linkElement.href = `assets/favicons/default/favicon-${size}x${size}.png`;
    }
  }
}
