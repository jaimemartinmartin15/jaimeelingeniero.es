import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, first } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent extends BaseOperatorComponent {
  public headerPrintData = { author: 'Jaime Martín Martín', date: '11 de junio de 2022' };

  protected operator = first();

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍓', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍋', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🥦', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

  public constructor(titleService: Title, metaService: Meta) {
    super(titleService, metaService, 'first');
  }

  protected moveElement(e: ElementInConveyor): void {
    e.x += this.demo.speed;
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    return e.x >= 300 && e.x <= 320;
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    return e.x >= 450;
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    this.elementsInConveyor.push({ conveyorId, type, value, x: 220 } as ElementInConveyor);
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 350,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverErrorEvent(): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.ERROR,
      value: this.controllerButtons[this.MAIN_ID][0].value,
      x: 350,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverCompleteEvent(): void {
    setTimeout(
      () =>
        this.elementsInConveyor.push({
          conveyorId: this.MAIN_ID,
          type: ObservableEventType.COMPLETE,
          value: this.controllerButtons[this.MAIN_ID][1].value,
          x: 350,
        } as ElementInConveyor),
      1000 / this.demo.speed
    );
  }
}
