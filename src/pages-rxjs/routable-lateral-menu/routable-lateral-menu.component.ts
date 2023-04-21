import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HomeLink, LINKS_GROUPS_OPERATORS, LINKS_TO_START } from '../home/menu-links';

@Component({
  selector: 'app-routable-lateral-menu',
  templateUrl: './routable-lateral-menu.component.html',
  styleUrls: ['./routable-lateral-menu.component.scss'],
})
export class RoutableLateralMenuComponent implements OnInit {
  public updateHeaderPrint$ = new Subject<void>();

  public GROUPS_OF_LINKS: HomeLink[];

  public isSmallerThanDesktop: boolean = window.matchMedia('(max-width: 1200px)').matches;

  public ngOnInit() {
    this.GROUPS_OF_LINKS = [LINKS_TO_START, ...LINKS_GROUPS_OPERATORS];
    window.matchMedia('(max-width: 1200px)').addEventListener('change', (e) => {
      this.isSmallerThanDesktop = e.matches;
    });
  }
}
