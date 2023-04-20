import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HomeLink, LINKS_GROUPS_OPERATORS, LINKS_TO_START } from './menu-links';

@Component({
  selector: 'app-rxjs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showHomeLinksToStart = true;

  public readonly LINKS_GROUPS_OPERATORS = LINKS_GROUPS_OPERATORS;
  public readonly LINKS_TO_START = LINKS_TO_START;

  public searchControl = new FormControl<string>('', { nonNullable: true });

  public ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((searchCriteria: string) => (searchCriteria = searchCriteria.toLocaleLowerCase()));
  }

  public hasToShowGroup(homeLink: HomeLink): boolean {
    return homeLink.links.some((l) => l.display.toLowerCase().includes(this.searchControl.value.toLowerCase()));
  }

  public hasToShowLink(link: HomeLink['links'][number]): boolean {
    return link.display.toLowerCase().includes(this.searchControl.value.toLowerCase());
  }
}
