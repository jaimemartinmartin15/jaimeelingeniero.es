import { Component } from '@angular/core';
import { RestoreScrollService } from 'src/shared/services/restore-scroll.service';
import { SeoService } from 'src/shared/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host{ display: block; }'],
})
export class AppComponent {
  public constructor(readonly seoService: SeoService, readonly restoreScrollService: RestoreScrollService) {
    seoService.listenNavigationEvents();
    restoreScrollService.listenScrollRestoration();
  }
}
