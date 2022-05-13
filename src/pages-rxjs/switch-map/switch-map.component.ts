import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { observableAnimation } from '../shared/rxjs-animations';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss'],
  animations: [observableAnimation],
})
export class SwitchMapComponent {
  private nextMergeMapId = 2;

  public readonly MAIN_M = '0';
  public readonly MAIN_E = '1';
  public readonly SWITCH: string[] = [];

  @ViewChild(DemoContainerComponent)
  private demo: DemoContainerComponent;

  public readonly speechBubble$ = new Subject<SpeechBubble>();

  public elementsInConveyor: ElementInConveyor[] = [];

  private readonly initialPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN_M]: { x: 260, y: 546 },
    [this.MAIN_E]: { x: 466, y: 546 },
  };

  private readonly finalPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN_M]: { x: 420, y: 546 },
    [this.MAIN_E]: { x: 645, y: 546 },
  };

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_M]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN_M, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_M, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN_M, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN_M, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN_M, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_M]: new BehaviorSubject<boolean>(false),
  };

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        const isOutside = this.moveElementInConveyor(e);

        if (isOutside) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          this.handleDeliveredElement(e);
        }
      });
    });
  }

  private handleDeliveredElement(e: ElementInConveyor) {
    if (e.conveyorId === this.MAIN_M && e.type === ObservableEventType.NEXT) {
      this.addNewSwitchMapConveyor();
    } else if (e.conveyorId === this.MAIN_E && e.type === ObservableEventType.NEXT) {
      this.speechBubble$.next({
        message: e.value,
        type: e.type,
      });
    } else if (e.conveyorId === this.MAIN_M || e.conveyorId === this.MAIN_E) {
      this.speechBubble$.next({
        message: e.value,
        type: e.type,
      });
      this.onSubscribe(false);
    } else if (e.type === ObservableEventType.COMPLETE) {
      this.removeSwitchMapConveyor(e.conveyorId);
    } else {
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_E,
        type: e.type,
        value: e.value,
        ...this.initialPositions[this.MAIN_E],
      });
    }
  }

  private removeSwitchMapConveyor(id: string) {
    this.SWITCH.splice(this.SWITCH.indexOf(id), 1);

    delete this.controllerButtons[id];
    delete this.conveyorsWorking[id];
    delete this.initialPositions[id];
    delete this.finalPositions[id];

    this.recalculatePositionOfElementsInConveyor();
  }

  private recalculatePositionOfElementsInConveyor() {
    Object.keys(this.initialPositions)
      .slice(2)
      .forEach((key, index) => {
        this.initialPositions[key].x = 450 - 100 * (this.SWITCH.length - 1) + index * 200;
        this.initialPositions[key].y = 200;
      });

    Object.keys(this.finalPositions)
      .slice(2)
      .forEach((key, index) => {
        this.finalPositions[key].x = 450 - 100 * (this.SWITCH.length - 1) + index * 200;
        this.finalPositions[key].y = 405;
      });

    this.elementsInConveyor.forEach((e, index) => {
      if (e.conveyorId !== this.MAIN_M && e.conveyorId !== this.MAIN_E) {
        e.x = 450 - 100 * (this.SWITCH.length - 1) + index * 200;
      }
    });
  }

  private addNewSwitchMapConveyor() {
    const M_ID = `${this.nextMergeMapId++}`;
    this.SWITCH.push(M_ID);

    this.controllerButtons[M_ID] = [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: M_ID, enabled: true },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: M_ID, enabled: true },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: M_ID, enabled: true },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: M_ID, enabled: true },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: M_ID, enabled: true },
    ];

    this.conveyorsWorking[M_ID] = new BehaviorSubject<boolean>(true);

    this.initialPositions[M_ID] = { x: 450 - 100 * (this.SWITCH.length - 1) + (parseInt(M_ID) - 2) * 200, y: 200 };
    this.finalPositions[M_ID] = { x: 450 - 100 * (this.SWITCH.length - 1) + (parseInt(M_ID) - 2) * 200, y: 405 };

    this.recalculatePositionOfElementsInConveyor();
  }

  private moveElementInConveyor(e: ElementInConveyor): boolean {
    let isOutside = false;
    if (e.conveyorId === this.MAIN_M || e.conveyorId === this.MAIN_E) {
      e.x += this.demo.speed;
      if (e.conveyorId === this.MAIN_M) {
        isOutside = e.x >= this.finalPositions[this.MAIN_M].x;
      } else {
        isOutside = e.x >= this.finalPositions[this.MAIN_E].x;
      }

      if (e.type !== ObservableEventType.NEXT) {
        isOutside = e.x >= this.finalPositions[this.MAIN_E].x;
      }
    } else {
      e.y += this.demo.speed;
      isOutside = e.y >= this.finalPositions[e.conveyorId].y;
    }

    return isOutside;
  }

  public onSubscribe(isSubscribed: boolean): void {
    Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = isSubscribed)));
    Object.values(this.conveyorsWorking).forEach((conveyor) => conveyor.next(isSubscribed));

    this.SWITCH.length = 0;
    this.elementsInConveyor.length = 0;
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR) {
      Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
    } else if (button.type === ObservableEventType.COMPLETE) {
      if (button.controllerId === this.MAIN_M) {
        Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
      } else {
        this.controllerButtons[button.controllerId].forEach((button) => (button.enabled = false));
      }
    }

    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      ...this.initialPositions[button.controllerId],
      conveyorId: button.controllerId,
    });
  }
}
