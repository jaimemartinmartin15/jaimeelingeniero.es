import { Component } from '@angular/core';
import { COMMANDS_LIST } from './menu/menu-links';

@Component({
  selector: 'app-pages-commands',
  templateUrl: './pages-commands.component.html',
  styleUrls: ['./pages-commands.component.scss'],
})
export class PagesCommandsComponent {
  public isShowingLeftMenu: boolean = false;
  public readonly COMMANDS = COMMANDS_LIST;

  public showHideBackLink(showLeftMenu: boolean) {
    // Avoid error ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => (this.isShowingLeftMenu = showLeftMenu), 0);
  }
}
