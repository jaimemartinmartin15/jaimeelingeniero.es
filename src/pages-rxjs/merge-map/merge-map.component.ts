import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { observableAnimation } from '../shared/rxjs-animations';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss'],
  animations: [observableAnimation],
})
export class MergeMapComponent implements AfterViewInit {
  private nextMergeMapId = 2;

  public readonly MAIN_O = '0'; // Main deliver to operator
  public readonly MAIN_S = '1'; // Main deliver to subscriber
  public readonly MERGE: string[] = [];

  @ViewChild(DemoContainerComponent)
  private demo: DemoContainerComponent;

  public readonly speechBubble$ = new Subject<SpeechBubble>();

  public elementsInConveyor: ElementInConveyor[] = [];

  private readonly initialPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN_O]: { x: 260, y: 546 },
    [this.MAIN_S]: { x: 466, y: 546 },
  };

  private readonly finalPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN_O]: { x: 420, y: 546 },
    [this.MAIN_S]: { x: 645, y: 546 },
  };

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_O]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN_O, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_O, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN_O, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN_O, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN_O, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_O]: new BehaviorSubject<boolean>(false),
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
    if (e.conveyorId === this.MAIN_O && e.type === ObservableEventType.NEXT) {
      this.addNewMergeMapConveyor();
    } else if (e.conveyorId === this.MAIN_O) {
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_S,
        type: e.type,
        value: e.value,
        x: e.x,
        y: e.y,
      });
    } else if (e.conveyorId === this.MAIN_S && e.type === ObservableEventType.NEXT) {
      this.speechBubble$.next({
        message: e.value,
        type: e.type,
      });
    } else if (e.conveyorId === this.MAIN_S) {
      this.speechBubble$.next({
        message: e.value,
        type: e.type,
      });
      this.onSubscribe(false);
    } else if (e.type === ObservableEventType.COMPLETE) {
      this.removeMergeMapConveyor(e.conveyorId);
    } else if (e.type === ObservableEventType.ERROR) {
      this.conveyorsWorking[e.conveyorId].next(false);
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_S,
        type: e.type,
        value: e.value,
        ...this.initialPositions[this.MAIN_S],
      });
    } else {
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_S,
        type: e.type,
        value: e.value,
        ...this.initialPositions[this.MAIN_S],
      });
    }
  }

  private addNewMergeMapConveyor() {
    const M_ID = `${this.nextMergeMapId++}`;
    this.MERGE.push(M_ID);

    this.controllerButtons[M_ID] = [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: M_ID, enabled: this.controllerButtons[this.MAIN_O][0].enabled },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: M_ID, enabled: this.controllerButtons[this.MAIN_O][0].enabled },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: M_ID, enabled: this.controllerButtons[this.MAIN_O][0].enabled },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: M_ID, enabled: this.controllerButtons[this.MAIN_O][0].enabled },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: M_ID, enabled: this.controllerButtons[this.MAIN_O][0].enabled },
    ];

    this.conveyorsWorking[M_ID] = new BehaviorSubject<boolean>(true);

    this.initialPositions[M_ID] = { x: 450 - 100 * this.MERGE.length + 50, y: 200 };
    this.finalPositions[M_ID] = { x: 450 - 100 * this.MERGE.length + 50, y: 405 };

    this.recalculatePositionOfElementsInConveyor();
  }

  private removeMergeMapConveyor(id: string) {
    this.MERGE.splice(this.MERGE.indexOf(id), 1);

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
        this.initialPositions[key].x = 450 - 100 * (this.MERGE.length - 1) + 200 * index;
        this.initialPositions[key].y = 200;
      });

    Object.keys(this.finalPositions)
      .slice(2)
      .forEach((key, index) => {
        this.finalPositions[key].x = 450 - 100 * (this.MERGE.length - 1) + 200 * index;
        this.finalPositions[key].y = 405;
      });

    this.elementsInConveyor.forEach((e) => {
      if (e.conveyorId !== this.MAIN_O && e.conveyorId !== this.MAIN_S) {
        e.x = 450 - 100 * (this.MERGE.length - 1) + 200 * this.MERGE.indexOf(e.conveyorId);
      }
    });
  }

  private moveElementInConveyor(e: ElementInConveyor): boolean {
    let isOutside = false;
    if (e.conveyorId === this.MAIN_O || e.conveyorId === this.MAIN_S) {
      e.x += this.demo.speed;

      if (e.conveyorId === this.MAIN_O) {
        isOutside = e.x >= this.finalPositions[this.MAIN_O].x;
      } else {
        isOutside = e.x >= this.finalPositions[this.MAIN_S].x;
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

    this.MERGE.forEach((id) => {
      delete this.conveyorsWorking[id];
      delete this.controllerButtons[id];
      delete this.initialPositions[id];
      delete this.finalPositions[id];
    });
    this.MERGE.length = 0;
    this.elementsInConveyor.length = 0;
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR) {
      // disable all buttons of all controllers
      Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
    } else if (button.type === ObservableEventType.COMPLETE) {
      if (button.controllerId === this.MAIN_O) {
        // disable all buttons of all controllers
        Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
      } else {
        // disable all buttons of the merge map controller
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
