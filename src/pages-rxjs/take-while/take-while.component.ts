import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-take-while',
  templateUrl: './take-while.component.html',
  styleUrls: ['./take-while.component.scss'],
})
export class TakeWhileComponent implements OnInit, AfterViewInit, OnDestroy {

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('TakeWhile rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs takeWhile' });
  }

  public ngAfterViewInit() {}

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
