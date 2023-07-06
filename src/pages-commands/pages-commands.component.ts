import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-commands',
  templateUrl: './pages-commands.component.html',
  styleUrls: ['./pages-commands.component.scss'],
})
export class PagesCommandsComponent {
  public readonly commands: { display: string; url: string }[] = [{ display: 'find', url: '/comandos/find' }];
}
