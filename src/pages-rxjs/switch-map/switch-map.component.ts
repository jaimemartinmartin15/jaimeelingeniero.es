import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { fadeInOut } from '../shared/rxjs-animations';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss'],
  animations: [fadeInOut],
})
export class SwitchMapComponent implements OnInit, AfterViewInit, OnDestroy {
  private nextSwitchMapId = 2;

  public readonly MAIN_O = '0'; // Main deliver to operator
  public readonly MAIN_S = '1'; // Main deliver to subscriber
  public readonly SWITCH: string[] = [];

  @ViewChild(DemoContainerComponent)
  private demo: DemoContainerComponent;

  public readonly speechBubble$ = new Subject<SpeechBubble>();

  public elementsInConveyor: ElementInConveyor[] = [];

  private readonly initialPositions: { [key: string]: { x?: number; y?: number } } = {
    [this.MAIN_O]: { x: 260 },
    [this.MAIN_S]: { x: 466 },
  };

  private readonly finalPositions: { [key: string]: { x?: number; y?: number } } = {
    [this.MAIN_O]: { x: 420 },
    [this.MAIN_S]: { x: 645 },
  };

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_O]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN_O, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_O, enabled: false },
      { value: '💜', type: ObservableEventType.NEXT, controllerId: this.MAIN_O, enabled: false },
      { value: '❤️', type: ObservableEventType.NEXT, controllerId: this.MAIN_O, enabled: false },
      { value: '💚', type: ObservableEventType.NEXT, controllerId: this.MAIN_O, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_O]: new BehaviorSubject<boolean>(false),
  };

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('SwitchMap rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs switchMap' });
  }

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
      this.replaceSwitchMapConveyor(e.value === '💜' ? ['🍇', '🍆', '🍒'] : e.value === '💚' ? ['🍏', '🥒', '🥦'] : ['🍓', '🍉', '🍅']);
    } else if (e.conveyorId === this.MAIN_O) {
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_S,
        type: e.type,
        value: e.value,
        x: e.x,
      } as ElementInConveyor);
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
      this.removeSwitchMapConveyor(e.conveyorId);
      this.controllerButtons[this.MAIN_O].forEach((button) => (button.enabled = true));
    } else if (e.type === ObservableEventType.ERROR) {
      this.conveyorsWorking[e.conveyorId].next(false);
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_S,
        type: e.type,
        value: e.value,
        x: this.initialPositions[this.MAIN_S].x,
      } as ElementInConveyor);
    } else {
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_S,
        type: e.type,
        value: e.value,
        x: this.initialPositions[this.MAIN_S].x,
      } as ElementInConveyor);

      this.controllerButtons[this.MAIN_O].forEach(
        (button) => (button.enabled = this.elementsInConveyor.filter((ec) => ec.conveyorId === e.conveyorId).length === 0)
      );
    }
  }

  private replaceSwitchMapConveyor([value1, value2, value3]: string[]) {
    const S_ID = `${this.nextSwitchMapId++}`;
    this.SWITCH.push(S_ID);

    const buttonsEnabled = this.controllerButtons[this.MAIN_O][0].enabled && this.elementsInConveyor.every((e) => e.conveyorId != this.MAIN_O);
    this.controllerButtons[S_ID] = [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: S_ID, enabled: buttonsEnabled },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: S_ID, enabled: buttonsEnabled },
      { value: value1, type: ObservableEventType.NEXT, controllerId: S_ID, enabled: buttonsEnabled },
      { value: value2, type: ObservableEventType.NEXT, controllerId: S_ID, enabled: buttonsEnabled },
      { value: value3, type: ObservableEventType.NEXT, controllerId: S_ID, enabled: buttonsEnabled },
    ];

    this.conveyorsWorking[S_ID] = new BehaviorSubject<boolean>(true);

    this.initialPositions[S_ID] = { y: 120 };
    this.finalPositions[S_ID] = { y: 325 };

    if (this.SWITCH.length == 2) {
      this.removeSwitchMapConveyor(this.SWITCH[0]);
    }
  }

  private removeSwitchMapConveyor(id: string) {
    this.SWITCH.splice(this.SWITCH.indexOf(id), 1);

    delete this.controllerButtons[id];
    delete this.conveyorsWorking[id];
    delete this.initialPositions[id];
    delete this.finalPositions[id];

    this.elementsInConveyor = this.elementsInConveyor.filter((e) => e.conveyorId !== id);
  }

  private moveElementInConveyor(e: ElementInConveyor): boolean {
    let isOutside = false;
    if (e.conveyorId === this.MAIN_O || e.conveyorId === this.MAIN_S) {
      e.x += this.demo.speed;

      if (e.conveyorId === this.MAIN_O) {
        isOutside = e.x >= this.finalPositions[this.MAIN_O].x!;
      } else {
        isOutside = e.x >= this.finalPositions[this.MAIN_S].x!;
      }
    } else {
      e.y += this.demo.speed;
      isOutside = e.y >= this.finalPositions[e.conveyorId].y!;
    }

    return isOutside;
  }

  public onSubscribe(isSubscribed: boolean): void {
    Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = isSubscribed)));
    Object.values(this.conveyorsWorking).forEach((conveyor) => conveyor.next(isSubscribed));

    this.SWITCH.forEach((id) => {
      delete this.conveyorsWorking[id];
      delete this.controllerButtons[id];
      delete this.initialPositions[id];
      delete this.finalPositions[id];
    });
    this.SWITCH.length = 0;
    this.elementsInConveyor.length = 0;
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR || button.type === ObservableEventType.COMPLETE) {
      // disable all buttons of all controllers
      Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
    } else if (button.controllerId == this.MAIN_O && this.SWITCH.length > 0) {
      // disable all buttons of the switch map controller
      this.controllerButtons[this.SWITCH[0]].forEach((button) => (button.enabled = false));
    } else if (button.controllerId != this.MAIN_O) {
      // disable all buttons of the main controller
      this.controllerButtons[this.MAIN_O].forEach((button) => (button.enabled = false));
    }

    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      ...this.initialPositions[button.controllerId],
      conveyorId: button.controllerId,
    } as ElementInConveyor);
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
