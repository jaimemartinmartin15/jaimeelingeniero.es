import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-distinct',
  templateUrl: './distinct.component.html',
  styleUrls: ['./distinct.component.scss'],
})
export class DistinctComponent implements OnInit, AfterViewInit, OnDestroy {

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('Distinct rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs distinct' });
  }

  public ngAfterViewInit() {}

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
