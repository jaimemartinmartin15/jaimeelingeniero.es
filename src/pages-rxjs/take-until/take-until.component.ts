import { Component } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html',
  styleUrls: ['./take-until.component.scss'],
})
export class TakeUntilComponent extends BaseOperatorComponent {
  public TAKE_UNTIL = '1';
  protected operator: any;
  private takeUntil$: Subject<string>;

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🔨', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ],
    [this.TAKE_UNTIL]: [
      { value: '🔨', type: ObservableEventType.ERROR, controllerId: this.TAKE_UNTIL, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.TAKE_UNTIL, enabled: false },
      { value: '✊', type: ObservableEventType.NEXT, controllerId: this.TAKE_UNTIL, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
    [this.TAKE_UNTIL]: new BehaviorSubject<boolean>(false),
  };

  protected moveElement(e: ElementInConveyor): void {
    if (e.conveyorId === this.MAIN_ID) {
      e.x += this.demo.speed;
    } else {
      e.y += this.demo.speed;
    }
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    if (e.conveyorId === this.MAIN_ID) {
      return e.x >= 440 && e.x < 460;
    } else {
      return e.y >= 370;
    }
  }

  public override onOperatorConveyorDeliverElement(e: ElementInConveyor): void {
    if (e.type === ObservableEventType.NEXT) {
      this.takeUntil$.next(e.value);
    } else if (e.type === ObservableEventType.ERROR) {
      this.takeUntil$.error(e.value);
      this.conveyorsWorking[this.TAKE_UNTIL].next(false);
      this.controllerButtons[this.TAKE_UNTIL].forEach((button) => (button.enabled = false));
      this.elementsInConveyor = this.elementsInConveyor.filter((e) => e.conveyorId != this.TAKE_UNTIL);
    } else if (e.type === ObservableEventType.COMPLETE) {
      this.takeUntil$.complete();
      this.conveyorsWorking[this.TAKE_UNTIL].next(false);
      this.controllerButtons[this.TAKE_UNTIL].forEach((button) => (button.enabled = false));
      this.elementsInConveyor = this.elementsInConveyor.filter((e) => e.conveyorId != this.TAKE_UNTIL);
    }
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    return e.x >= 675;
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    if (conveyorId === this.MAIN_ID) {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 240, y: 435 });
    } else {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 395, y: 155 });
    }
  }

  public override onSubscribeHook() {
    this.takeUntil$ = new Subject<string>();
    this.operator = takeUntil(this.takeUntil$);
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 500,
      y: 435,
    });
  }

  protected onOperatorDeliverErrorEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.ERROR,
      value,
      x: 500,
      y: 435,
    });
  }

  protected onOperatorDeliverCompleteEvent(): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.COMPLETE,
      value: this.controllerButtons[this.MAIN_ID][1].value,
      x: 500,
      y: 435,
    });
  }
}
