import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-print',
  templateUrl: './header-print.component.html',
  styleUrls: ['./header-print.component.scss'],
})
export class HeaderPrintComponent {
  @Input()
  public data: { author: string; date: string };
}
