import { Component } from '@angular/core';
import { BehaviorSubject, map, pipe, switchMap, timer } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent extends BaseOperatorComponent {
  public readonly today = new Date();

  protected operator = pipe(
    switchMap(() => timer(2000)),
    map(() => '0️⃣')
  );
  private completeTimeout: ReturnType<typeof setTimeout>;

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {};

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

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
    this.operator = pipe(
      switchMap(() => timer(2000)),
      map(() => '0️⃣')
    );
    clearTimeout(this.completeTimeout);

    // makes subscription to timer after Subject is created
    setTimeout(() => this.elementReachesOperator$.next(''));
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 80,
    } as ElementInConveyor);

    this.elementReachesOperator$.complete();
  }

  protected onOperatorDeliverErrorEvent(): void {}

  protected onOperatorDeliverCompleteEvent(): void {
    this.completeTimeout = setTimeout(
      () =>
        this.elementsInConveyor.push({
          conveyorId: this.MAIN_ID,
          type: ObservableEventType.COMPLETE,
          value: '🖐️',
          x: 80,
        } as ElementInConveyor),
      1000 / this.demo.speed
    );
  }
}
