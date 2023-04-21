import { Component } from '@angular/core';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { fadeInOut } from '../shared/rxjs-animations';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss'],
  animations: [fadeInOut],
})
export class SwitchMapComponent extends BaseOperatorComponent {
  private nextSwitchMapId = 1;
  public readonly SWITCHMAP: string[] = [];
  protected operator: any;

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

  private switchMap$: { [key: string]: Subject<string> } = {};

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
      this.switchMap$[e.conveyorId].next(e.value);
    } else if (e.type === ObservableEventType.ERROR) {
      this.switchMap$[e.conveyorId].error(e.value);
      this.controllerButtons[e.conveyorId].forEach((button) => (button.enabled = false));
      this.conveyorsWorking[e.conveyorId].next(false);
      this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId != e.conveyorId);
    } else if (e.type === ObservableEventType.COMPLETE) {
      this.switchMap$[e.conveyorId].complete();
      delete this.switchMap$[e.conveyorId];
      delete this.controllerButtons[e.conveyorId];
      delete this.conveyorsWorking[e.conveyorId];
      this.SWITCHMAP.splice(this.SWITCHMAP.indexOf(e.conveyorId), 1);
      this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId != e.conveyorId);
    }
  }

  public override elementReachesOperatorNextHook() {
    if (this.SWITCHMAP.length === 2) {
      const id = this.SWITCHMAP.shift()!;
      delete this.controllerButtons[id];
      delete this.conveyorsWorking[id];
      delete this.switchMap$[id];
      this.elementsInConveyor = this.elementsInConveyor.filter((e) => e.conveyorId !== id);
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
    this.SWITCHMAP.length = 0;
    this.elementsInConveyor.length = 0;
    this.conveyorsWorking = { [this.MAIN_ID]: this.conveyorsWorking[this.MAIN_ID] };
    this.conveyorsWorking[this.MAIN_ID].next(isSubscribed);
    this.controllerButtons = { [this.MAIN_ID]: this.controllerButtons[this.MAIN_ID] };
    this.controllerButtons[this.MAIN_ID].forEach((button) => (button.enabled = isSubscribed));
    this.switchMap$ = {};

    this.operator = switchMap((value) => {
      this.SWITCHMAP.push(`${this.nextSwitchMapId}`);
      this.conveyorsWorking[this.nextSwitchMapId] = new BehaviorSubject<boolean>(true);
      const [value1, value2, value3] = value === '💜' ? ['🍇', '🍆', '🍒'] : value === '💚' ? ['🍏', '🥒', '🥦'] : ['🍓', '🍉', '🍅'];
      this.controllerButtons[this.nextSwitchMapId] = [
        { value: '🏠', type: ObservableEventType.ERROR, controllerId: `${this.nextSwitchMapId}`, enabled: true },
        { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: `${this.nextSwitchMapId}`, enabled: true },
        { value: value1, type: ObservableEventType.NEXT, controllerId: `${this.nextSwitchMapId}`, enabled: true },
        { value: value2, type: ObservableEventType.NEXT, controllerId: `${this.nextSwitchMapId}`, enabled: true },
        { value: value3, type: ObservableEventType.NEXT, controllerId: `${this.nextSwitchMapId}`, enabled: true },
      ];
      this.switchMap$[this.nextSwitchMapId] = new Subject<string>();
      return this.switchMap$[this.nextSwitchMapId++];
    });
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
