import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss'],
})
export class <%= classify(name) %>Component implements OnInit, AfterViewInit, OnDestroy {

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('<%= classify(name) %> rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs <%= name %>' });
  }

  public ngAfterViewInit() {}

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
