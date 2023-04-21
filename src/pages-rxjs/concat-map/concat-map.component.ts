import { Component } from '@angular/core';
import { BehaviorSubject, concatMap, Subject } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { fadeInOut } from '../shared/rxjs-animations';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss'],
  animations: [fadeInOut],
})
export class ConcatMapComponent extends BaseOperatorComponent {
  private nextConcatMapId = 1;
  public readonly CONCATMAP: string[] = [];
  protected operator: any;
  private mainConveyorCompletedOrError = false;

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '💜', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '❤️', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '💚', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

  private concatMap$: { [key: string]: Subject<string> } = {};

  protected moveElement(e: ElementInConveyor): void {
    if (e.conveyorId === this.MAIN_ID) {
      e.x += this.demo.speed;
    } else {
      e.y += this.demo.speed;
    }
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    if (e.conveyorId === this.MAIN_ID) {
      return e.x >= 420 && e.x < 440;
    } else {
      return e.y >= 325;
    }
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    return e.x >= 645;
  }

  public override onOperatorConveyorDeliverElement(e: ElementInConveyor) {
    if (e.type === ObservableEventType.NEXT) {
      this.concatMap$[e.conveyorId].next(e.value);
    } else if (e.type === ObservableEventType.ERROR) {
      this.concatMap$[e.conveyorId].error(e.value);
      this.controllerButtons[e.conveyorId].forEach((button) => (button.enabled = false));
      this.conveyorsWorking[e.conveyorId].next(false);
      this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId !== e.conveyorId);
    } else if (e.type === ObservableEventType.COMPLETE) {
      delete this.controllerButtons[e.conveyorId];
      delete this.conveyorsWorking[e.conveyorId];
      this.CONCATMAP.shift();
      this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId !== e.conveyorId);
      this.concatMap$[e.conveyorId].complete();
      delete this.concatMap$[e.conveyorId];

      if (this.CONCATMAP.length > 0) {
        this.controllerButtons[this.CONCATMAP[0]].forEach((button) => (button.enabled = true));
        this.conveyorsWorking[this.CONCATMAP[0]].next(true);
      }
    }
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    if (conveyorId === this.MAIN_ID) {
      this.elementsInConveyor.push({ conveyorId, type, value, x: 260 } as ElementInConveyor);
    } else {
      this.elementsInConveyor.push({ conveyorId, type, value, y: 120 } as ElementInConveyor);
    }
  }

  public override onSubscribeHook(isSubscribed: boolean) {
    this.CONCATMAP.length = 0;
    this.elementsInConveyor.length = 0;
    this.conveyorsWorking = { [this.MAIN_ID]: this.conveyorsWorking[this.MAIN_ID] };
    this.conveyorsWorking[this.MAIN_ID].next(isSubscribed);
    this.controllerButtons = { [this.MAIN_ID]: this.controllerButtons[this.MAIN_ID] };
    this.controllerButtons[this.MAIN_ID].forEach((button) => (button.enabled = isSubscribed));
    this.concatMap$ = {};
    this.mainConveyorCompletedOrError = false;

    this.operator = concatMap(() => {
      this.concatMap$[this.CONCATMAP[0] ?? this.nextConcatMapId] = new Subject<string>();
      return this.concatMap$[this.CONCATMAP[0] ?? this.nextConcatMapId];
    });
  }

  public override elementReachesOperatorNextHook({ value }: ElementInConveyor) {
    if (!this.mainConveyorCompletedOrError) {
      this.CONCATMAP.push(`${this.nextConcatMapId}`);
      this.conveyorsWorking[this.nextConcatMapId] = new BehaviorSubject<boolean>(this.CONCATMAP.length === 1);
      const [value1, value2, value3] = value === '💜' ? ['🍇', '🍆', '🍒'] : value === '💚' ? ['🍏', '🥒', '🥦'] : ['🍓', '🍉', '🍅'];
      this.controllerButtons[this.nextConcatMapId] = [
        { value: '🏠', type: ObservableEventType.ERROR, controllerId: `${this.nextConcatMapId}`, enabled: this.CONCATMAP.length === 1 },
        { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: `${this.nextConcatMapId}`, enabled: this.CONCATMAP.length === 1 },
        { value: value1, type: ObservableEventType.NEXT, controllerId: `${this.nextConcatMapId}`, enabled: this.CONCATMAP.length === 1 },
        { value: value2, type: ObservableEventType.NEXT, controllerId: `${this.nextConcatMapId}`, enabled: this.CONCATMAP.length === 1 },
        { value: value3, type: ObservableEventType.NEXT, controllerId: `${this.nextConcatMapId}`, enabled: this.CONCATMAP.length === 1 },
      ];
      this.nextConcatMapId++;
    }
  }

  public override elementReachesOperatorErrorHook() {
    this.mainConveyorCompletedOrError = true;
  }

  public override elementReachesOperatorCompleteHook() {
    this.mainConveyorCompletedOrError = true;
  }

  protected onOperatorDeliverNextEvent(value: string) {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 475,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverErrorEvent(value: string) {
    this.mainConveyorCompletedOrError = true;
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.ERROR,
      value,
      x: 475,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverCompleteEvent() {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.COMPLETE,
      value: '🖐️',
      x: 475,
    } as ElementInConveyor);
  }
}
