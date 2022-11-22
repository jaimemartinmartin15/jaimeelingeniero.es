import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { LINKS_GROUPS_OPERATORS, LINKS_TO_START, HomeLink } from './menu-links';

@Component({
  selector: 'app-rxjs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public showHomeLinksToStart = true;

  public readonly LINKS_GROUPS_OPERATORS = LINKS_GROUPS_OPERATORS;
  public readonly LINKS_TO_START = LINKS_TO_START;

  public searchControl = new FormControl<string>('', { nonNullable: true });

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Índice operadores rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Accede a la lista de operadores rxjs' });
    this.metaService.updateTag({ name: 'keywords', content: 'operadores rxjs, lista' });

    this.searchControl.valueChanges.subscribe((searchCriteria: string) => (searchCriteria = searchCriteria.toLocaleLowerCase()));
  }

  public hasToShowGroup(homeLink: HomeLink): boolean {
    return homeLink.links.some((l) => l.display.toLowerCase().includes(this.searchControl.value.toLowerCase()));
  }

  public hasToShowLink(link: HomeLink['links'][number]): boolean {
    return link.display.toLowerCase().includes(this.searchControl.value.toLowerCase());
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}
