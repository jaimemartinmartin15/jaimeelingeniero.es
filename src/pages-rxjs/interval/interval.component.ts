import { Component } from '@angular/core';
import { BehaviorSubject, interval, map, pipe, switchMap } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss'],
})
export class IntervalComponent extends BaseOperatorComponent {
  protected operator = pipe(
    switchMap(() => interval(2000)),
    map((n) => this.convertToEmojis(n))
  );

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
      switchMap(() => interval(2000)),
      map((n) => this.convertToEmojis(n))
    );

    // makes subscription to interval after Subject is created
    setTimeout(() => this.elementReachesOperator$.next(''));
  }

  private convertToEmojis(n: number): string {
    const stringified = `${n}`;
    const emojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

    return [...stringified].map((c) => emojis[+c]).join('');
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 80,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverErrorEvent(): void {}
  protected onOperatorDeliverCompleteEvent(): void {}
}
