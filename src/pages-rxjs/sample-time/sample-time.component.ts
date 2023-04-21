import { Component } from '@angular/core';
import { BehaviorSubject, interval, sampleTime, Subscription, tap } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-sample-time',
  templateUrl: './sample-time.component.html',
  styleUrls: ['./sample-time.component.scss'],
})
export class SampleTimeComponent extends BaseOperatorComponent {
  private errorOrCompleteEmitted = false;
  public elementInStandBy = '';
  public counterSubscription: Subscription;
  public counter = 3;
  protected operator = sampleTime(3000);

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
      this.elementInStandBy = e.value;
    }
  }

  public override elementReachesOperatorErrorHook(e: ElementInConveyor) {
    this.errorOrCompleteEmitted = true;
    this.stopCounter();
    this.elementInStandBy = '';
  }

  public override elementReachesOperatorCompleteHook(e: ElementInConveyor) {
    this.errorOrCompleteEmitted = true;
    this.stopCounter();
    this.elementInStandBy = '';
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    this.elementsInConveyor.push({ conveyorId, type, value, x: 220 } as ElementInConveyor);
  }

  public override onSubscribeHook(isSubscription: boolean) {
    this.errorOrCompleteEmitted = false;
    this.elementInStandBy = '';
    this.counter = 3;

    if (isSubscription) {
      this.counterSubscription = interval(100)
        .pipe(
          tap(() => {
            this.counter = parseFloat((this.counter - 0.1).toFixed(2));
            this.counter = this.counter <= 0 ? 3 : this.counter;
          })
        )
        .subscribe();
    } else {
      this.stopCounter();
    }
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.elementInStandBy = '';
    this.counter = 3;
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 350,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverErrorEvent(value: string): void {
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
