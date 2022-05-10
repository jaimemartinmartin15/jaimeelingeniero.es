import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatestWith, interval, map, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-combine-latest-with',
  templateUrl: './combine-latest-with.component.html',
  styleUrls: ['./combine-latest-with.component.scss'],
})
export class CombineLatestWithComponent implements AfterViewInit {
  public readonly MAIN_L = '0';
  public readonly LEFT = '1';
  public readonly RIGHT = '2';
  public readonly MAIN_R = '3';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_L]: new BehaviorSubject<boolean>(false),
    [this.LEFT]: new BehaviorSubject<boolean>(false),
    [this.RIGHT]: new BehaviorSubject<boolean>(false),
    [this.MAIN_R]: new BehaviorSubject<boolean>(false),
  };

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_L]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN_L, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_L, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN_L, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN_L, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN_L, enabled: false },
    ],
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
    [this.MAIN_L]: { x: 240, y: 486 },
    [this.LEFT]: { x: 355, y: 160 },
    [this.RIGHT]: { x: 545, y: 160 },
    [this.MAIN_R]: { x: 480, y: 486 },
  };

  private readonly finalPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN_L]: { x: 435, y: 486 },
    [this.LEFT]: { x: 355, y: 380 },
    [this.RIGHT]: { x: 545, y: 380 },
    [this.MAIN_R]: { x: 660, y: 486 },
  };

  public elementsInConveyor: ElementInConveyor[] = [];
  public elementsInStandby: [ElementInConveyor, ElementInConveyor, ElementInConveyor] = [
    {} as any as ElementInConveyor,
    {} as any as ElementInConveyor,
    {} as any as ElementInConveyor,
  ];

  public speechBubble$ = new Subject<SpeechBubble>();

  private demoSubjects: { [key: string]: Subject<ElementInConveyor> } = {
    [this.MAIN_L]: new Subject(),
    [this.LEFT]: new Subject(),
    [this.RIGHT]: new Subject(),
  };

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        let isOutside = this.moveElementInConveyor(e);

        if (isOutside) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          if (e.conveyorId === this.MAIN_R) {
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
            this.elementsInConveyor.push({
              type: e.type,
              value: e.value,
              ...this.initialPositions[this.MAIN_R],
              conveyorId: this.MAIN_R,
            });
            this.conveyorsWorking[e.conveyorId].next(false);
          } else {
            this.conveyorsWorking[e.conveyorId].next(false);
            if (
              [
                this.conveyorsWorking[this.MAIN_L].getValue(),
                this.conveyorsWorking[this.LEFT].getValue(),
                this.conveyorsWorking[this.RIGHT].getValue(),
              ].every((working) => !working)
            ) {
              this.elementsInConveyor.push({
                type: ObservableEventType.COMPLETE,
                value: '🖐️',
                ...this.initialPositions[this.MAIN_R],
                conveyorId: this.MAIN_R,
              });
            }
          }
        }
      });
    });
  }

  private moveElementInConveyor(e: ElementInConveyor): boolean {
    let isOutside = false;
    switch (e.conveyorId) {
      case this.MAIN_L:
        if (e.x < this.finalPositions[this.MAIN_L].x) {
          e.x += this.demo.speed;
          isOutside = false;
        } else {
          isOutside = true;
        }
        break;
      case this.LEFT:
        if (e.y < this.finalPositions[this.LEFT].y) {
          e.y += this.demo.speed;
          isOutside = false;
        } else {
          isOutside = true;
        }
        break;
      case this.RIGHT:
        if (e.y < this.finalPositions[this.RIGHT].y) {
          e.y += this.demo.speed;
          isOutside = false;
        } else {
          isOutside = true;
        }
        break;
      case this.MAIN_R:
        if (e.x < this.finalPositions[this.MAIN_R].x) {
          e.x += this.demo.speed;
          isOutside = false;
        } else {
          isOutside = true;
        }
        break;
    }
    return isOutside;
  }

  public onSubscribe(isSubscribed: boolean) {
    Object.values(this.conveyorsWorking).forEach((c) => c.next(isSubscribed));

    this.elementsInConveyor.length = 0;

    Object.values(this.controllerButtons).forEach((values) => values.forEach((b) => (b.enabled = isSubscribed)));

    this.elementsInStandby = [{} as any as ElementInConveyor, {} as any as ElementInConveyor, {} as any as ElementInConveyor];

    this.demoSubjects = {
      [this.MAIN_L]: new Subject(),
      [this.LEFT]: new Subject(),
      [this.RIGHT]: new Subject(),
    };

    this.demoSubjects[this.MAIN_L]
      .pipe(
        combineLatestWith(this.demoSubjects[this.LEFT], this.demoSubjects[this.RIGHT]),
        map(([main, left, right]) => [main.value, left.value, right.value])
      )
      .subscribe(([main, left, right]) => {
        this.elementsInConveyor.push({
          conveyorId: this.MAIN_R,
          type: ObservableEventType.NEXT,
          value: `[${main},${left},${right}]`,
          ...this.initialPositions[this.MAIN_R],
        });
      });
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR || button.type === ObservableEventType.COMPLETE) {
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
