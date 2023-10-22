import { Component } from '@angular/core';
import { COMMANDS_LIST } from '../menu/menu-links';

@Component({
  selector: 'app-commands-layout-page',
  templateUrl: './commands-layout-page.component.html',
  styleUrls: ['./commands-layout-page.component.scss'],
})
export class CommandsLayoutPageComponent {
  public isShowingLeftMenu: boolean = false;
  public readonly COMMANDS = COMMANDS_LIST;

  public showHideBackLink(showLeftMenu: boolean) {
    // Avoid error ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => (this.isShowingLeftMenu = showLeftMenu), 0);
  }
}
