import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html',
  styleUrls: ['./take-until.component.scss'],
})
export class TakeUntilComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly MAIN = '0';
  public readonly TAKE_UNTIL = '1';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN, enabled: false },
    ],
    [this.TAKE_UNTIL]: [
      { value: '🔨', type: ObservableEventType.ERROR, controllerId: this.TAKE_UNTIL, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.TAKE_UNTIL, enabled: false },
      { value: '✊', type: ObservableEventType.NEXT, controllerId: this.TAKE_UNTIL, enabled: false },
    ],
  };

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN]: new BehaviorSubject<boolean>(false),
    [this.TAKE_UNTIL]: new BehaviorSubject<boolean>(false),
  };

  private allowOperatorDeliverElements = true;

  public elementsInConveyor: ElementInConveyor[] = [];

  public speechBubble$ = new Subject<SpeechBubble>();

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('TakeUntil rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs takeUntil' });
  }

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        if (e.conveyorId === this.MAIN) {
          this.moveElementInMainConveyor(e);
        } else {
          this.moveElementInTakeUntilConveyor(e);
        }
      });
    });
  }

  private moveElementInMainConveyor(e: ElementInConveyor) {
    e.x += this.demo.speed;
    if (e.x >= 440 && e.x < 460 && e.type === ObservableEventType.NEXT) {
      this.elementDeliveredToOperator(e);
    } else if (e.x > 675) {
      this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
      this.speechBubble$.next({
        message: e.value,
        type: e.type,
      });

      if (e.type === ObservableEventType.COMPLETE || e.type === ObservableEventType.ERROR) {
        this.onSubscribe(false);
      }
    }
  }

  private elementDeliveredToOperator(e: ElementInConveyor) {
    if (this.allowOperatorDeliverElements) {
      e.x = 500;
      return;
    }

    this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
  }

  private moveElementInTakeUntilConveyor(e: ElementInConveyor) {
    e.y += this.demo.speed;

    if (e.y >= 370) {
      this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);

      if (e.type === ObservableEventType.COMPLETE) {
        this.onTakeUntilConveyorDeliverCompleteEvent(e);
      } else if (e.type === ObservableEventType.ERROR) {
        this.onTakeUntilConveyorDeliverErrorEvent(e);
      } else {
        this.onTakeUntilConveyorDeliverNextEvent(e);
      }
    }
  }

  public onTakeUntilConveyorDeliverCompleteEvent(e: ElementInConveyor) {
    this.conveyorsWorking[this.TAKE_UNTIL].next(false);
  }

  public onTakeUntilConveyorDeliverErrorEvent(e: ElementInConveyor) {
    this.elementsInConveyor.push({
      type: ObservableEventType.ERROR,
      conveyorId: this.MAIN,
      value: this.controllerButtons[this.TAKE_UNTIL][0].value,
      x: 500,
      y: 435,
    });
    this.allowOperatorDeliverElements = false;
  }

  public onTakeUntilConveyorDeliverNextEvent(e: ElementInConveyor) {
    this.elementsInConveyor.push({
      type: ObservableEventType.COMPLETE,
      conveyorId: this.MAIN,
      value: this.controllerButtons[this.MAIN][1].value,
      y: 435,
      x: 490,
    });
    this.allowOperatorDeliverElements = false;
  }

  public onSubscribe(isSubscribed: boolean) {
    Object.keys(this.conveyorsWorking).forEach((conveyor) => this.conveyorsWorking[conveyor].next(isSubscribed));
    Object.keys(this.controllerButtons).forEach((controller) =>
      this.controllerButtons[controller].forEach((button) => (button.enabled = isSubscribed))
    );
    this.elementsInConveyor.length = 0;
    this.allowOperatorDeliverElements = true;
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.controllerId === this.MAIN) {
      this.onMainControllerButtonClick(button);
    } else {
      this.onOperatorControllerButtonClick(button);
    }
  }

  public onOperatorControllerButtonClick(button: ButtonController) {
    if (button.type !== ObservableEventType.COMPLETE) {
      Object.keys(this.controllerButtons).forEach((controller) => this.controllerButtons[controller].forEach((button) => (button.enabled = false)));
    } else {
      this.controllerButtons[this.TAKE_UNTIL].forEach((button) => (button.enabled = false));
    }

    this.elementsInConveyor.push({
      type: button.type,
      conveyorId: button.controllerId,
      value: button.value,
      y: 155,
      x: 395,
    });
  }

  public onMainControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.COMPLETE || button.type === ObservableEventType.ERROR) {
      Object.keys(this.controllerButtons).forEach((controller) => this.controllerButtons[controller].forEach((button) => (button.enabled = false)));
    }

    this.elementsInConveyor.push({
      type: button.type,
      conveyorId: button.controllerId,
      value: button.value,
      y: 435,
      x: 240,
    });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
