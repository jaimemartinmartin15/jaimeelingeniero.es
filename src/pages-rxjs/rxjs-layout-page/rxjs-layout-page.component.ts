import { Component, OnInit } from '@angular/core';
import { HomeLink, LINKS_GROUPS_OPERATORS, LINKS_TO_START } from '../home/menu-links';

@Component({
  selector: 'app-rxjs-layout-page',
  templateUrl: './rxjs-layout-page.component.html',
  styleUrls: ['./rxjs-layout-page.component.scss'],
})
export class RxjsLayoutPageComponent implements OnInit {
  public GROUPS_OF_LINKS: HomeLink[];

  public isSmallerThanDesktop: boolean = window.matchMedia('(max-width: 1200px)').matches;

  public ngOnInit() {
    this.GROUPS_OF_LINKS = [LINKS_TO_START, ...LINKS_GROUPS_OPERATORS];
    window.matchMedia('(max-width: 1200px)').addEventListener('change', (e) => {
      this.isSmallerThanDesktop = e.matches;
    });
  }
}
