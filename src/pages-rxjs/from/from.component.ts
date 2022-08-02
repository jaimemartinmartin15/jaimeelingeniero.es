import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, from } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss'],
})
export class FromComponent implements OnInit, OnDestroy {
  protected operator = from(['🥚', '🥕', '🥩']);

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {};

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {};

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('From rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs from' });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
