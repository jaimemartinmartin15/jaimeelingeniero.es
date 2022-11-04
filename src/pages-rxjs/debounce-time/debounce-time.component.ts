import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, debounceTime, interval, tap, Subscription } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-debounce-time',
  templateUrl: './debounce-time.component.html',
  styleUrls: ['./debounce-time.component.scss'],
})
export class DebounceTimeComponent extends BaseOperatorComponent {
  public headerPrintData = { author: 'Jaime Martín Martín', date: '30 de mayo de 2022' };

  private errorOrCompleteEmitted = false;
  private counterSubscription: Subscription;
  public elementInStandBy = '';
  public counter = 3;
  protected operator = debounceTime(3000);

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍇', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

  public constructor(titleService: Title, metaService: Meta) {
    super(titleService, metaService, 'debounceTime');
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

  public override elementReachesOperatorNextHook(e: ElementInConveyor) {
    if (!this.errorOrCompleteEmitted) {
      if (this.elementInStandBy == '') {
        this.counterSubscription = interval(100)
          .pipe(tap(() => (this.counter = parseFloat((this.counter - 0.1).toFixed(2)))))
          .subscribe();
      } else {
        this.counter = 3;
      }
      this.elementInStandBy = e.value;
    }
  }

  public override elementReachesOperatorErrorHook(e: ElementInConveyor) {
    this.errorOrCompleteEmitted = true;
  }

  public override elementReachesOperatorCompleteHook(e: ElementInConveyor) {
    this.errorOrCompleteEmitted = true;
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    this.elementsInConveyor.push({ conveyorId, type, value, x: 220 } as ElementInConveyor);
  }

  public override onSubscribeHook() {
    this.errorOrCompleteEmitted = false;
    this.elementInStandBy = '';
    this.counter = 3;
    this.stopCounter();
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.elementInStandBy = '';
    this.stopCounter();
    this.counter = 3;
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 350,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverErrorEvent(value: string): void {
    this.elementInStandBy = '';
    this.stopCounter();
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.ERROR,
      value,
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

  public getCounterValue(): string {
    return this.counter == parseInt(this.counter + '') ? this.counter + '.0' : this.counter + '';
  }

  private stopCounter() {
    if (this.counterSubscription != null) {
      this.counterSubscription.unsubscribe();
    }
  }
}
