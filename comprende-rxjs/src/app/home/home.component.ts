import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { HOME_LINKS_GROUPS, HOME_LINKS_TO_START } from './links-group-list';

@Component({
  selector: 'app-rxjs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public showHomeLinksToStart = true;

  public filtered_home_links = HOME_LINKS_GROUPS;
  public HOME_LINKS_TO_START = HOME_LINKS_TO_START;

  public searchControl = new FormControl('');

  public constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta
  ) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Índice operadores rxjs');
    this.metaService.updateTag({
      name: 'description',
      content: 'Accede a la lista de operadores rxjs',
    });

    this.searchControl.valueChanges.subscribe((searchCriteria: string) => {
      searchCriteria = searchCriteria.toLocaleLowerCase();

      this.showHomeLinksToStart = HOME_LINKS_TO_START.links.some((operator) =>
        operator.display.toLocaleLowerCase().includes(searchCriteria)
      );

      this.filtered_home_links = HOME_LINKS_GROUPS.filter((group) =>
        group.links.some((operator) =>
          operator.display.toLocaleLowerCase().includes(searchCriteria)
        )
      ).map((group) => {
        const groupFiltered = {
          subtitle: group.subtitle,
          links: group.links.filter((operator) =>
            operator.display.toLocaleLowerCase().includes(searchCriteria)
          ),
        };

        return groupFiltered;
      });
    });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
