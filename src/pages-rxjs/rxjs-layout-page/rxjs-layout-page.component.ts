import { Component, OnInit } from '@angular/core';
import { HomeMenuLink, LINKS_GROUPS_OPERATORS, LINKS_TO_START } from '../home-menu/home-menu-links';

@Component({
  selector: 'app-rxjs-layout-page',
  templateUrl: './rxjs-layout-page.component.html',
  styleUrls: ['./rxjs-layout-page.component.scss'],
})
export class RxjsLayoutPageComponent implements OnInit {
  public GROUPS_OF_LINKS: HomeMenuLink[];

  // as in ResponsiveLayoutComponent
  public isShowingLeftMenu: boolean = window.matchMedia('(max-width: 900px)').matches;

  public ngOnInit() {
    this.GROUPS_OF_LINKS = [LINKS_TO_START, ...LINKS_GROUPS_OPERATORS];
    window.matchMedia('(max-width: 900px)').addEventListener('change', (e) => {
      this.isShowingLeftMenu = e.matches;
    });
  }
}
