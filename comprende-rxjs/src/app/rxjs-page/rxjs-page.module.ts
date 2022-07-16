import { Inject, NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RxjsPageComponent } from './rxjs-page.component';
import { RxjsPageRoutingModule } from './rxjs-page-routing.module';

@NgModule({
  imports: [CommonModule, RxjsPageRoutingModule],
  declarations: [RxjsPageComponent],
})
export class PagesRxjsModule {
  public constructor(@Inject(DOCUMENT) private document: Document) {
    const head = this.document.getElementsByTagName('head')[0];

    // loads style for syntax highlight
    const highlightStyle = this.document.createElement('link');
    highlightStyle.rel = 'stylesheet';
    highlightStyle.href =
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css';
    head.appendChild(highlightStyle);

    // loads script for syntx highlight
    const highlightScript = this.document.createElement('script');
    highlightScript.type = 'application/javascript';
    highlightScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js';
    head.appendChild(highlightScript);
  }
}
