import { Component } from '@angular/core';
import { BehaviorSubject, forkJoin, Subject, switchMap } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.scss'],
})
export class ForkJoinComponent extends BaseOperatorComponent {
  public readonly FORKJOIN = ['1', '2', '3'];
  protected operator: any;

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {
    [this.FORKJOIN[0]]: [
      { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.FORKJOIN[0], enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.FORKJOIN[0], enabled: false },
      { value: '🍐', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[0], enabled: false },
      { value: '🍍', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[0], enabled: false },
      { value: '🍇', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[0], enabled: false },
    ],
    [this.FORKJOIN[1]]: [
      { value: '🥁', type: ObservableEventType.ERROR, controllerId: this.FORKJOIN[1], enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.FORKJOIN[1], enabled: false },
      { value: '🍓', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[1], enabled: false },
      { value: '🍉', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[1], enabled: false },
      { value: '🍊', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[1], enabled: false },
    ],
    [this.FORKJOIN[2]]: [
      { value: '👕', type: ObservableEventType.ERROR, controllerId: this.FORKJOIN[2], enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.FORKJOIN[2], enabled: false },
      { value: '🍏', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[2], enabled: false },
      { value: '🥕', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[2], enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.FORKJOIN[2], enabled: false },
    ],
  };

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
    [this.FORKJOIN[0]]: new BehaviorSubject<boolean>(false),
    [this.FORKJOIN[1]]: new BehaviorSubject<boolean>(false),
    [this.FORKJOIN[2]]: new BehaviorSubject<boolean>(false),
  };

  private forkJoin$: { [key: string]: Subject<string> } = {
    [this.FORKJOIN[0]]: new Subject<string>(),
    [this.FORKJOIN[1]]: new Subject<string>(),
    [this.FORKJOIN[2]]: new Subject<string>(),
  };

  public elementsInStandby: [ElementInConveyor, ElementInConveyor, ElementInConveyor] = [
    {} as any as ElementInConveyor,
    {} as any as ElementInConveyor,
    {} as any as ElementInConveyor,
  ];

  protected moveElement(e: ElementInConveyor): void {
    if (e.conveyorId === this.MAIN_ID) {
      e.x += this.demo.speed;
    } else {
      e.y += this.demo.speed;
    }
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    if (e.conveyorId === this.FORKJOIN[0] || e.conveyorId === this.FORKJOIN[1] || e.conveyorId === this.FORKJOIN[2]) {
      return e.y >= 377;
    }
    return false;
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    return e.x >= 640;
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    if (conveyorId === this.MAIN_ID) {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 55, y: 406 });
    } else if (conveyorId === this.FORKJOIN[0]) {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 150, y: 155 });
    } else if (conveyorId === this.FORKJOIN[1]) {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 345, y: 155 });
    } else {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 540, y: 155 });
    }
  }

  public override onOperatorConveyorDeliverElement(e: ElementInConveyor) {
    if (e.type === ObservableEventType.COMPLETE || e.type === ObservableEventType.ERROR) {
      this.controllerButtons[e.conveyorId].forEach((button) => (button.enabled = false));
      this.conveyorsWorking[e.conveyorId].next(false);
      this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId != e.conveyorId);
    }

    if (e.type === ObservableEventType.NEXT || e.type === ObservableEventType.ERROR) {
      this.elementsInStandby[parseInt(e.conveyorId) - 1] = e;
    }

    if (e.type === ObservableEventType.COMPLETE) {
      this.forkJoin$[e.conveyorId].complete();
    } else if (e.type === ObservableEventType.NEXT) {
      this.forkJoin$[e.conveyorId].next(e.value);
    } else {
      this.forkJoin$[e.conveyorId].error(e.value);
    }
  }

  public override onSubscribeHook() {
    this.elementsInStandby = [{} as any as ElementInConveyor, {} as any as ElementInConveyor, {} as any as ElementInConveyor];
    this.forkJoin$ = {
      [this.FORKJOIN[0]]: new Subject<string>(),
      [this.FORKJOIN[1]]: new Subject<string>(),
      [this.FORKJOIN[2]]: new Subject<string>(),
    };
    this.operator = switchMap(() => forkJoin(Object.values(this.forkJoin$)));

    // makes subscription to forkJoin after Subject is created
    setTimeout(() => this.elementReachesOperator$.next(''));
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value: `[${this.elementsInStandby[0].value},${this.elementsInStandby[1].value},${this.elementsInStandby[2].value}]`,
      x: 55,
      y: 406,
    } as ElementInConveyor);

    // after the emission, complete the source observable
    setTimeout(() => this.elementReachesOperator$.complete(), 1000 / this.demo.speed);
  }

  protected onOperatorDeliverErrorEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.ERROR,
      value,
      x: 55,
      y: 406,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverCompleteEvent(): void {
    setTimeout(() => {
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_ID,
        type: ObservableEventType.COMPLETE,
        value: '🖐️',
        x: 55,
        y: 406,
      } as ElementInConveyor);
    }, 1000 / this.demo.speed);
  }
}
