import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, mergeMap, Subject } from 'rxjs';
import { fadeInOut } from '../shared/rxjs-animations';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { BaseOperatorComponent } from '../shared/base-operator.component';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss'],
  animations: [fadeInOut],
})
export class MergeMapComponent extends BaseOperatorComponent {
  public headerPrintData = { author: 'Jaime Martín Martín', date: '20 de abril de 2022' };

  private nextMergeMapId = 1;
  public readonly MERGEMAP: string[] = [];
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

  private mergeMap$: { [key: string]: Subject<string> } = {};

  public constructor(titleService: Title, metaService: Meta) {
    super(titleService, metaService, 'mergeMap');
  }

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
      this.mergeMap$[e.conveyorId].next(e.value);
    } else if (e.type === ObservableEventType.ERROR) {
      this.mergeMap$[e.conveyorId].error(e.value);
      this.controllerButtons[e.conveyorId].forEach((button) => (button.enabled = false));
      this.conveyorsWorking[e.conveyorId].next(false);
      this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId != e.conveyorId);
    } else if (e.type === ObservableEventType.COMPLETE) {
      this.mergeMap$[e.conveyorId].complete();
      delete this.mergeMap$[e.conveyorId];
      delete this.controllerButtons[e.conveyorId];
      delete this.conveyorsWorking[e.conveyorId];
      this.MERGEMAP.splice(this.MERGEMAP.indexOf(e.conveyorId), 1);
      this.elementsInConveyor = this.elementsInConveyor.filter((e2) => e2.conveyorId != e.conveyorId);
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
    this.MERGEMAP.length = 0;
    this.elementsInConveyor.length = 0;
    this.conveyorsWorking = { [this.MAIN_ID]: this.conveyorsWorking[this.MAIN_ID] };
    this.conveyorsWorking[this.MAIN_ID].next(isSubscribed);
    this.controllerButtons = { [this.MAIN_ID]: this.controllerButtons[this.MAIN_ID] };
    this.controllerButtons[this.MAIN_ID].forEach((button) => (button.enabled = isSubscribed));
    this.mergeMap$ = {};

    this.operator = mergeMap((value) => {
      this.MERGEMAP.push(`${this.nextMergeMapId}`);
      this.conveyorsWorking[this.nextMergeMapId] = new BehaviorSubject<boolean>(true);
      const [value1, value2, value3] = value === '💜' ? ['🍇', '🍆', '🍒'] : value === '💚' ? ['🍏', '🥒', '🥦'] : ['🍓', '🍉', '🍅'];
      this.controllerButtons[this.nextMergeMapId] = [
        { value: '🏠', type: ObservableEventType.ERROR, controllerId: `${this.nextMergeMapId}`, enabled: true },
        { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: `${this.nextMergeMapId}`, enabled: true },
        { value: value1, type: ObservableEventType.NEXT, controllerId: `${this.nextMergeMapId}`, enabled: true },
        { value: value2, type: ObservableEventType.NEXT, controllerId: `${this.nextMergeMapId}`, enabled: true },
        { value: value3, type: ObservableEventType.NEXT, controllerId: `${this.nextMergeMapId}`, enabled: true },
      ];
      this.mergeMap$[this.nextMergeMapId] = new Subject<string>();
      return this.mergeMap$[this.nextMergeMapId++];
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
