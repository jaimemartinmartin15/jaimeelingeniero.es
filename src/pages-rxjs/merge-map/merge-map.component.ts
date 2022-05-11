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
  public readonly MAIN_M = '0';
  public readonly MAIN_E = '1';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public readonly speechBubble$ = new Subject<SpeechBubble>();

  public elementsInConveyor: ElementInConveyor[] = [];

  private readonly initialPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN_M]: { x: 260, y: 446 },
    [this.MAIN_E]: { x: 466, y: 446 },
  };

  private readonly finalPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN_M]: { x: 420, y: 446 },
    [this.MAIN_E]: { x: 645, y: 446 },
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

  public handleDeliveredElement(e: ElementInConveyor) {
    if (e.conveyorId === this.MAIN_M && e.type === ObservableEventType.NEXT) {
      this.addNewMergeMapConveyor();
    } else if (e.conveyorId === this.MAIN_M) {
      this.speechBubble$.next({
        message: e.value,
        type: e.type,
      });
      this.onSubscribe(false);
    } else {
      // TODO
    }
  }

  public addNewMergeMapConveyor() {
    // TODO
  }

  public moveElementInConveyor(e: ElementInConveyor): boolean {
    let isOutside = false;
    if (e.conveyorId === this.MAIN_M) {
      e.x += this.demo.speed;
      isOutside = e.x >= this.finalPositions[this.MAIN_M].x && e.type === ObservableEventType.NEXT;
      if (e.type !== ObservableEventType.NEXT) {
        isOutside = e.x >= this.finalPositions[this.MAIN_E].x;
      }
    } else {
      e.y += this.demo.speed;
      isOutside = e.y >= this.finalPositions[this.MAIN_M].y;
    }

    return isOutside;
  }

  public onSubscribe(isSubscribed: boolean): void {
    Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = isSubscribed)));
    Object.values(this.conveyorsWorking).forEach((conveyor) => conveyor.next(isSubscribed));
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR || button.type === ObservableEventType.COMPLETE) {
      Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
    }

    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      ...this.initialPositions[button.controllerId],
      conveyorId: button.controllerId,
    });
  }
}
