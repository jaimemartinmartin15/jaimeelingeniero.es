import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
export class ForkJoinComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly MAIN = '0';
  public readonly FORKJOIN = ['1', '2', '3'];

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN]: new BehaviorSubject<boolean>(false),
    [this.FORKJOIN[0]]: new BehaviorSubject<boolean>(false),
    [this.FORKJOIN[1]]: new BehaviorSubject<boolean>(false),
    [this.FORKJOIN[2]]: new BehaviorSubject<boolean>(false),
  };

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

  private readonly initialPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN]: { x: 55, y: 406 },
    [this.FORKJOIN[0]]: { x: 150, y: 155 },
    [this.FORKJOIN[1]]: { x: 345, y: 155 },
    [this.FORKJOIN[2]]: { x: 540, y: 155 },
  };

  private readonly finalPositions: { [key: string]: { x: number; y: number } } = {
    [this.MAIN]: { x: 640, y: 406 },
    [this.FORKJOIN[0]]: { x: 150, y: 377 },
    [this.FORKJOIN[1]]: { x: 345, y: 377 },
    [this.FORKJOIN[2]]: { x: 540, y: 377 },
  };

  public elementsInConveyor: ElementInConveyor[] = [];
  public elementsInStandby: [ElementInConveyor, ElementInConveyor, ElementInConveyor] = [
    {} as any as ElementInConveyor,
    {} as any as ElementInConveyor,
    {} as any as ElementInConveyor,
  ];

  public speechBubble$ = new Subject<SpeechBubble>();

  private demoSubjects: { [key: string]: Subject<ElementInConveyor> } = {
    [this.FORKJOIN[0]]: new Subject(),
    [this.FORKJOIN[1]]: new Subject(),
    [this.FORKJOIN[2]]: new Subject(),
  };

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('ForkJoin rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs forkJoin' });
  }

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
            this.elementsInStandby[parseInt(e.conveyorId) - 1] = e;
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

    this.elementsInStandby = [{} as any as ElementInConveyor, {} as any as ElementInConveyor, {} as any as ElementInConveyor];

    this.demoSubjects = {
      [this.FORKJOIN[0]]: new Subject(),
      [this.FORKJOIN[1]]: new Subject(),
      [this.FORKJOIN[2]]: new Subject(),
    };

    forkJoin(Object.values(this.demoSubjects))
      .pipe(map((elements) => elements.map((v) => v.value)))
      .subscribe({
        next: (elements) => {
          this.elementsInConveyor.push({
            conveyorId: this.MAIN,
            type: ObservableEventType.NEXT,
            value: `[${elements.join(',')}]`,
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
      // if one Observable emits without emiting values before, disable all buttons to complete main Observable
      if (
        Object.keys(this.elementsInStandby[parseInt(button.controllerId) - 1]).length === 0 &&
        this.elementsInConveyor.every((e) => e.conveyorId !== button.controllerId)
      ) {
        Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
      }
    }

    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      ...this.initialPositions[button.controllerId],
      conveyorId: button.controllerId,
    });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
