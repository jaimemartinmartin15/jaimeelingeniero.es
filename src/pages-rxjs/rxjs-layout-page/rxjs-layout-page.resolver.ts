import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RxjsLayoutPageResolver implements Resolve<unknown[]> {
  public constructor(@Inject(DOCUMENT) private document: Document) {}

  public resolve(): Observable<unknown[]> | Promise<unknown[]> | unknown[] {
    const filesToLoad = [];

    // loads style for syntax highlight
    filesToLoad.push(this.loadStyle('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css'));

    // loads script for syntax highlight
    filesToLoad.push(this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js'));

    return Promise.all(filesToLoad);
  }

  private loadScript(src: string) {
    return new Promise((resolve) => {
      const highlightScript = this.document.createElement('script');
      highlightScript.type = 'application/javascript';
      highlightScript.src = src;
      this.document.head.appendChild(highlightScript);
      highlightScript.addEventListener('load', resolve);
    });
  }

  private loadStyle(href: string) {
    return new Promise((resolve) => {
      const highlightStyle = this.document.createElement('link');
      highlightStyle.rel = 'stylesheet';
      highlightStyle.href = href;
      this.document.head.appendChild(highlightStyle);
      highlightStyle.addEventListener('load', resolve);
    });
  }
}
