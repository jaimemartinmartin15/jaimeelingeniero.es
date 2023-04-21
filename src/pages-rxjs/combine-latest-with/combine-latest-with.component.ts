import { Component } from '@angular/core';
import { BehaviorSubject, combineLatestWith, Subject } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-combine-latest-with',
  templateUrl: './combine-latest-with.component.html',
  styleUrls: ['./combine-latest-with.component.scss'],
})
export class CombineLatestWithComponent extends BaseOperatorComponent {
  public readonly COMBINELATESTWITH = [
    '1', // Combine latest with left
    '2', // Combine latest with right
    '3', // Main conveyor right
  ];
  protected operator: any;

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ],
    [this.COMBINELATESTWITH[0]]: [
      { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.COMBINELATESTWITH[0], enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.COMBINELATESTWITH[0], enabled: false },
      { value: '🍐', type: ObservableEventType.NEXT, controllerId: this.COMBINELATESTWITH[0], enabled: false },
      { value: '🍍', type: ObservableEventType.NEXT, controllerId: this.COMBINELATESTWITH[0], enabled: false },
      { value: '🍇', type: ObservableEventType.NEXT, controllerId: this.COMBINELATESTWITH[0], enabled: false },
    ],
    [this.COMBINELATESTWITH[1]]: [
      { value: '🥁', type: ObservableEventType.ERROR, controllerId: this.COMBINELATESTWITH[1], enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.COMBINELATESTWITH[1], enabled: false },
      { value: '🍓', type: ObservableEventType.NEXT, controllerId: this.COMBINELATESTWITH[1], enabled: false },
      { value: '🍉', type: ObservableEventType.NEXT, controllerId: this.COMBINELATESTWITH[1], enabled: false },
      { value: '🍊', type: ObservableEventType.NEXT, controllerId: this.COMBINELATESTWITH[1], enabled: false },
    ],
  };

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
    [this.COMBINELATESTWITH[0]]: new BehaviorSubject<boolean>(false),
    [this.COMBINELATESTWITH[1]]: new BehaviorSubject<boolean>(false),
    [this.COMBINELATESTWITH[2]]: new BehaviorSubject<boolean>(false),
  };

  private combineLatestWith$: { [key: string]: Subject<string> } = {
    [this.COMBINELATESTWITH[0]]: new Subject<string>(),
    [this.COMBINELATESTWITH[1]]: new Subject<string>(),
  };

  public elementsInStandby: [ElementInConveyor, ElementInConveyor, ElementInConveyor] = [
    {} as any as ElementInConveyor,
    {} as any as ElementInConveyor,
    {} as any as ElementInConveyor,
  ];

  protected moveElement(e: ElementInConveyor): void {
    if (e.conveyorId === this.MAIN_ID || e.conveyorId === this.COMBINELATESTWITH[2]) {
      e.x += this.demo.speed;
    } else {
      e.y += this.demo.speed;
    }
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    if (e.conveyorId === this.MAIN_ID) {
      return e.x >= 435;
    } else if (e.conveyorId === this.COMBINELATESTWITH[0] || e.conveyorId === this.COMBINELATESTWITH[1]) {
      return e.y >= 380;
    }

    return false;
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    return e.x >= 680;
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    if (conveyorId === this.MAIN_ID) {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 240, y: 486 });
    } else if (conveyorId === this.COMBINELATESTWITH[0]) {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 355, y: 160 });
    } else if (conveyorId === this.COMBINELATESTWITH[1]) {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 545, y: 160 });
    } else {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 480, y: 486 });
    }
  }

  public override elementReachesOperatorNextHook(e: ElementInConveyor) {
    this.elementsInStandby[0] = e;
  }

  public override elementReachesOperatorErrorHook(e: ElementInConveyor) {
    this.controllerButtons[e.conveyorId].forEach((button) => (button.enabled = false));
    this.conveyorsWorking[e.conveyorId].next(false);
    this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId != e.conveyorId);
    this.elementsInStandby[0] = e;
  }

  public override elementReachesOperatorCompleteHook(e: ElementInConveyor) {
    this.controllerButtons[e.conveyorId].forEach((button) => (button.enabled = false));
    this.conveyorsWorking[e.conveyorId].next(false);
    this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId != e.conveyorId);
  }

  public override onOperatorConveyorDeliverElement(e: ElementInConveyor) {
    if (e.type === ObservableEventType.COMPLETE || e.type === ObservableEventType.ERROR) {
      this.controllerButtons[e.conveyorId].forEach((button) => (button.enabled = false));
      this.conveyorsWorking[e.conveyorId].next(false);
      this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId != e.conveyorId);
    }

    if (e.type === ObservableEventType.NEXT || e.type === ObservableEventType.ERROR) {
      this.elementsInStandby[parseInt(e.conveyorId)] = e;
    }

    if (e.type === ObservableEventType.COMPLETE) {
      this.combineLatestWith$[e.conveyorId].complete();
    } else if (e.type === ObservableEventType.NEXT) {
      this.combineLatestWith$[e.conveyorId].next(e.value);
    } else {
      this.combineLatestWith$[e.conveyorId].error(e.value);
    }
  }

  public override onSubscribeHook() {
    this.elementsInStandby = [{} as any as ElementInConveyor, {} as any as ElementInConveyor, {} as any as ElementInConveyor];
    this.combineLatestWith$ = {
      [this.COMBINELATESTWITH[0]]: new Subject<string>(),
      [this.COMBINELATESTWITH[1]]: new Subject<string>(),
    };
    this.operator = combineLatestWith(Object.values(this.combineLatestWith$));
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.addElementToBeginningOfConveyor(this.COMBINELATESTWITH[2], ObservableEventType.NEXT, `[${value}]`);
  }

  protected onOperatorDeliverErrorEvent(value: string): void {
    this.addElementToBeginningOfConveyor(this.COMBINELATESTWITH[2], ObservableEventType.ERROR, value);
  }

  protected onOperatorDeliverCompleteEvent(): void {
    setTimeout(() => {
      this.addElementToBeginningOfConveyor(this.COMBINELATESTWITH[2], ObservableEventType.COMPLETE, '🖐️');
    }, 1000 / this.demo.speed);
  }
}
