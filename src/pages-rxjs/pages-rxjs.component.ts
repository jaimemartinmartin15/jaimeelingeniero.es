import { Component, OnInit } from '@angular/core';
import { HOME_LINKS_OTHERS, HOME_LINKS_TO_START } from './home/home-links';

@Component({
  selector: 'app-pages-rxjs',
  templateUrl: './pages-rxjs.component.html',
  styleUrls: ['./pages-rxjs.component.scss'],
})
export class PagesRxjsComponent implements OnInit {
  public readonly GROUPS_OF_OPERATORS = HOME_LINKS_OTHERS;
  public readonly GROUP_TO_START = HOME_LINKS_TO_START;

  public isSmallerThanDesktop: boolean = window.matchMedia('(max-width: 1200px)').matches;

  public ngOnInit() {
    window.matchMedia('(max-width: 1200px)').addEventListener('change', (e) => {
      this.isSmallerThanDesktop = e.matches;
    });
  }
}
