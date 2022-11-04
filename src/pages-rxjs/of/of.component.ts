import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { BaseOperatorComponent } from '../shared/base-operator.component';

@Component({
  selector: 'app-of',
  templateUrl: './of.component.html',
  styleUrls: ['./of.component.scss'],
})
export class OfComponent extends BaseOperatorComponent {
  public headerPrintData = { author: 'Jaime Martín Martín', date: '29 de julio de 2022' };

  private numberOfEmissions = 0;
  private subscriptions: ReturnType<typeof setTimeout>[] = [];
  protected operator = switchMap(() => of('🥥', '🌽', '🌶️'));

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ],
  };

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

  public constructor(titleService: Title, metaService: Meta) {
    super(titleService, metaService, 'of');
  }

  protected moveElement(e: ElementInConveyor): void {
    e.x += this.demo.speed;
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    return false;
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    return e.x >= 310;
  }

  protected addElementToBeginningOfConveyor() {}

  public override onSubscribeHook() {
    this.numberOfEmissions = 0;
    this.subscriptions.forEach((s) => clearTimeout(s));
    this.subscriptions.length = 0;
    this.operator = switchMap(() => of('🥥', '🌽', '🌶️'));

    // makes subscription to of after Subject is created
    setTimeout(() => this.elementReachesOperator$.next(''));
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    let timeout = setTimeout(() => {
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_ID,
        type: ObservableEventType.NEXT,
        value,
        x: 80,
      } as ElementInConveyor);
    }, (1000 / this.demo.speed) * this.numberOfEmissions * 1);
    this.subscriptions.push(timeout);

    this.numberOfEmissions++;
    if (this.numberOfEmissions === 3) {
      timeout = setTimeout(() => {
        this.elementReachesOperator$.complete();
      }, (1000 / this.demo.speed) * this.numberOfEmissions);
      this.subscriptions.push(timeout);
    }
  }

  protected onOperatorDeliverErrorEvent(): void {}

  protected onOperatorDeliverCompleteEvent(): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.COMPLETE,
      value: this.controllerButtons[this.MAIN_ID][1].value,
      x: 80,
    } as ElementInConveyor);
  }
}
