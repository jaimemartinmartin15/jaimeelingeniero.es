import { Component, Input } from '@angular/core';
import { ConveyorHorizontalComponent } from '../conveyor/horizontal/conveyor-horizontal.component';

@Component({
  selector: 'svg[appOperator]',
  templateUrl: './operator.component.svg',
  styles: [':host{ display: inline-block }'],
})
export class OperatorComponent {
  @Input()
  public position: number = 50;

  @Input("appOperator")
  public operatorName: string;

  public transformation: string = '';

  public constructor(conveyor: ConveyorHorizontalComponent) {
    if (conveyor == null) {
      throw new Error('Cannot create operator outside <app-conveyor-horizontal>');
    }

    // wait until parent gets the input value
    setTimeout(() => {
      const offset = ((conveyor.length - 60) / 100) * this.position;
      this.transformation = `translate(${offset}, 0)`;
    });
  }
}
