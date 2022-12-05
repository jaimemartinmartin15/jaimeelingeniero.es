import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { BehaviorSubject, from } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss'],
})
export class FromComponent implements OnInit, OnDestroy {
  public headerPrintData = { author: 'Jaime Martín Martín', date: '1 de agosto de 2022' };

  protected operator = from(['🥚', '🥕', '🥩']);

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {};

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {};

  public constructor(private readonly metaService: Meta) {}

  public ngOnInit() {
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs from' });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
