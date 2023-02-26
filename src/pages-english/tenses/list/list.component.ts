import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Verb } from '../verb';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  public verbs: Verb[];

  public constructor(private readonly activatedRoute: ActivatedRoute, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.verbs = this.activatedRoute.snapshot.data['listOfVerbs'];
    this.metaService.updateTag({
      name: 'description',
      content: 'Lista de verbos en inglés para estudiar',
    });
    this.metaService.updateTag({ name: 'keywords', content: 'Verbos, ingles, infinitivo, pasado, participio, significado' });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}
