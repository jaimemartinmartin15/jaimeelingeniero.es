import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages-rxjs',
  templateUrl: './rxjs-page.component.html',
  styleUrls: ['./rxjs-page.component.scss'],
})
export class RxjsPageComponent implements OnInit {
  public isSmallerThanDesktop: boolean = window.matchMedia(
    '(max-width: 1200px)'
  ).matches;
  public linksCollapsed: boolean = window.matchMedia('(max-width: 1200px)')
    .matches;

  public ngOnInit() {
    window.matchMedia('(max-width: 1200px)').addEventListener('change', (e) => {
      this.isSmallerThanDesktop = e.matches;
      this.linksCollapsed = e.matches;
    });
  }

  public collapse() {
    this.linksCollapsed = !this.linksCollapsed;
  }
}
