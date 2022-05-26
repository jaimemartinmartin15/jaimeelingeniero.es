import { Component } from '@angular/core';
import { HOME_LINKS } from './home-links';

@Component({
  selector: 'app-rxjs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public HOME_LINKS = HOME_LINKS;
}
