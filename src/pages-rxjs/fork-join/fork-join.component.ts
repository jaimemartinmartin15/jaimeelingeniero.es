import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject, forkJoin, interval, map, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.scss'],
})
export class ForkJoinComponent {
  public readonly MAIN = '0';
  public readonly LEFT = '1';
  public readonly RIGHT = '2';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN]: new BehaviorSubject<boolean>(false),
    [this.LEFT]: new BehaviorSubject<boolean>(false),
    [this.RIGHT]: new BehaviorSubject<boolean>(false),
  };

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {
    [this.LEFT]: [
      { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.LEFT, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.LEFT, enabled: false },
      { value: '🍐', type: ObservableEventType.NEXT, controllerId: this.LEFT, enabled: false },
      { value: '🍍', type: ObservableEventType.NEXT, controllerId: this.LEFT, enabled: false },
      { value: '🍇', type: ObservableEventType.NEXT, controllerId: this.LEFT, enabled: false },
    ],
    [this.RIGHT]: [
      { value: '🥁', type: ObservableEventType.ERROR, controllerId: this.RIGHT, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.RIGHT, enabled: false },
      { value: '🍓', type: ObservableEventType.NEXT, controllerId: this.RIGHT, enabled: false },
      { value: '🍉', type: ObservableEventType.NEXT, controllerId: this.RIGHT, enabled: false },
      { value: '🍊', type: ObservableEventType.NEXT, controllerId: this.RIGHT, enabled: false },
    ],
  };

  private readonly initialPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN]: { x: 55, y: 406 },
    [this.LEFT]: { x: 150, y: 155 },
    [this.RIGHT]: { x: 340, y: 155 },
  };

  private readonly finalPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN]: { x: 460, y: 406 },
    [this.LEFT]: { x: 150, y: 377 },
    [this.RIGHT]: { x: 340, y: 377 },
  };

  public elementsInConveyor: ElementInConveyor[] = [];
  public elementsInStandby: [ElementInConveyor, ElementInConveyor] = [{} as any as ElementInConveyor, {} as any as ElementInConveyor];

  public speechBubble$ = new Subject<SpeechBubble>();

  private demoSubjects: { [key: string]: Subject<ElementInConveyor> } = {
    [this.LEFT]: new Subject(),
    [this.RIGHT]: new Subject(),
  };

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        let isOutside = this.moveElementInConveyor(e);

        if (isOutside) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          if (e.conveyorId === this.MAIN) {
            this.speechBubble$.next({
              message: e.value,
              type: e.type,
            });
            if (e.type === ObservableEventType.ERROR || e.type === ObservableEventType.COMPLETE) {
              this.onSubscribe(false);
            }
          } else if (e.type === ObservableEventType.NEXT) {
            this.elementsInStandby[parseInt(e.conveyorId)] = e;
            this.demoSubjects[e.conveyorId].next(e);
          } else if (e.type === ObservableEventType.ERROR) {
            this.demoSubjects[e.conveyorId].error(e);
            this.conveyorsWorking[e.conveyorId].next(false);
          } else {
            this.conveyorsWorking[e.conveyorId].next(false);
            this.demoSubjects[e.conveyorId].complete();
          }
        }
      });
    });
  }

  private moveElementInConveyor(e: ElementInConveyor): boolean {
    let isOutside = false;
    if (e.conveyorId === this.MAIN) {
      if (e.x < this.finalPositions[this.MAIN].x) {
        e.x += this.demo.speed;
        isOutside = false;
      } else {
        isOutside = true;
      }
    } else {
      if (e.y < this.finalPositions[e.conveyorId].y) {
        e.y += this.demo.speed;
        isOutside = false;
      } else {
        isOutside = true;
      }
    }
    return isOutside;
  }

  public onSubscribe(isSubscribed: boolean) {
    Object.values(this.conveyorsWorking).forEach((c) => c.next(isSubscribed));

    this.elementsInConveyor.length = 0;

    Object.values(this.controllerButtons).forEach((values) => values.forEach((b) => (b.enabled = isSubscribed)));

    this.elementsInStandby = [{} as any as ElementInConveyor, {} as any as ElementInConveyor];

    this.demoSubjects = {
      [this.MAIN]: new Subject(),
      [this.LEFT]: new Subject(),
      [this.RIGHT]: new Subject(),
    };

    forkJoin([this.demoSubjects[this.LEFT], this.demoSubjects[this.RIGHT]])
      .pipe(map(([left, right]) => [left.value, right.value]))
      .subscribe({
        next: ([left, right]) => {
          console.log('holla');
          this.elementsInConveyor.push({
            conveyorId: this.MAIN,
            type: ObservableEventType.NEXT,
            value: `[${left},${right}]`,
            ...this.initialPositions[this.MAIN],
          });
        },
        error: (e) => {
          this.elementsInConveyor.push({
            type: e.type,
            value: e.value,
            ...this.initialPositions[this.MAIN],
            conveyorId: this.MAIN,
          });
        },
        complete: () => {
          setTimeout(() => {
            this.elementsInConveyor.push({
              conveyorId: this.MAIN,
              type: ObservableEventType.COMPLETE,
              value: '🖐️',
              ...this.initialPositions[this.MAIN],
            });
          }, 1000 / this.demo.speed);
        },
      });
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR) {
      Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
    } else if (button.type === ObservableEventType.COMPLETE) {
      this.controllerButtons[button.controllerId].forEach((b) => (b.enabled = false));
    }

    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      ...this.initialPositions[button.controllerId],
      conveyorId: button.controllerId,
    });
  }
}
