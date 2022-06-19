import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ID = '0';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public controllerButtons: ButtonController[] = [
    { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.ID, enabled: false },
    { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.ID, enabled: false },
    { value: '🍓', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍋', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🥦', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
  ];
  public conveyorWorking$ = new BehaviorSubject<boolean>(false);

  public elementsInConveyor: ElementInConveyor[] = [];
  private hasAlreadyEmittedFirstElement = false;

  public speechBubble$ = new Subject<SpeechBubble>();

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('First rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs first' });
  }

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.x += this.demo.speed;

        if (e.x >= 300 && e.x < 320 && e.type === ObservableEventType.NEXT) {
          this._nextElementReachesOperator(e);
        } else if (e.x >= 450) {
          this._elementDeliveredToSubscriber(e);
        }
      });
    });
  }

  private _elementDeliveredToSubscriber(e: ElementInConveyor) {
    this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
    if (e.type === ObservableEventType.ERROR || e.type === ObservableEventType.COMPLETE) {
      this.onSubscribe(false);
    }
    this.speechBubble$.next({
      type: e.type,
      message: e.value,
    });
  }

  private _nextElementReachesOperator(e: ElementInConveyor) {
    if (this.hasAlreadyEmittedFirstElement) {
      this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
      return;
    }

    e.x = 350;
    this.hasAlreadyEmittedFirstElement = true;
    this.controllerButtons.forEach((b) => (b.enabled = false));
    this.elementsInConveyor.push({
      type: ObservableEventType.COMPLETE,
      value: this.controllerButtons[1].value,
      x: 220,
      conveyorId: this.ID,
    } as ElementInConveyor);
  }

  public onSubscribe(isSubscribed: boolean) {
    this.conveyorWorking$.next(isSubscribed);
    this.controllerButtons.forEach((b) => (b.enabled = isSubscribed));
    this.elementsInConveyor.length = 0;
    this.hasAlreadyEmittedFirstElement = false;
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.COMPLETE) {
      this.onCompleteControllerButtonClick(button);
    } else if (button.type === ObservableEventType.ERROR) {
      this.onErrorControllerButtonClick(button);
    } else {
      this.onNextControllerButtonClick(button);
    }
  }

  private onCompleteControllerButtonClick(button: ButtonController) {
    this.controllerButtons.forEach((b) => (b.enabled = false));
    if (!this.hasAlreadyEmittedFirstElement) {
      this.elementsInConveyor.push({
        type: ObservableEventType.ERROR,
        value: this.controllerButtons[0].value,
        x: 220,
        conveyorId: this.ID,
      } as ElementInConveyor);
    }
  }

  private onNextControllerButtonClick(button: ButtonController) {
    this.controllerButtons[0].enabled = this.controllerButtons[1].enabled = false;
    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      x: 220,
      conveyorId: button.controllerId,
    } as ElementInConveyor);
  }

  private onErrorControllerButtonClick(button: ButtonController) {
    this.controllerButtons.forEach((b) => (b.enabled = false));
    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      x: 220,
      conveyorId: button.controllerId,
    } as ElementInConveyor);
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
