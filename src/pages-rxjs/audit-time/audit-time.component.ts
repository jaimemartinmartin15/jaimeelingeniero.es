import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { auditTime, BehaviorSubject, interval, Observable, Subject, Subscription } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-audit-time',
  templateUrl: './audit-time.component.html',
  styleUrls: ['./audit-time.component.scss'],
})
export class AuditTimeComponent implements AfterViewInit {
  private readonly ID = '0';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public controllerButtons: ButtonController[] = [
    { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.ID, enabled: false },
    { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.ID, enabled: false },
    { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍇', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
  ];

  public counter = 3;
  private counterSubscription?: Subscription;

  private operatorTimeout?: ReturnType<typeof setTimeout>;

  public conveyorWorking$ = new BehaviorSubject<boolean>(false);

  public elementsInConveyor: ElementInConveyor[] = [];
  public elementInStandBy: string;

  public speechBubble$ = new Subject<SpeechBubble>();

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.x += this.demo.speed;

        if (e.x >= 300 && e.x < 320 && e.type === ObservableEventType.NEXT) {
          this._nextElementReachesAuditTimeOperator(e);
        } else if (e.x >= 450) {
          this._elementDeliveredToSubscriber(e);
        }
      });
    });
  }

  private _elementDeliveredToSubscriber(e: ElementInConveyor) {
    this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);

    this.speechBubble$.next({
      type: e.type,
      message: e.value,
    });

    if (e.type === ObservableEventType.ERROR || e.type === ObservableEventType.COMPLETE) {
      this.onSubscribe(false);
    }
  }

  private _nextElementReachesAuditTimeOperator(e: ElementInConveyor) {
    if (this.controllerButtons[1].enabled) {
      this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
      this.elementInStandBy = e.value;

      if (this.counterSubscription == null) {
        this.counterSubscription = interval(100).subscribe(() => (this.counter = parseFloat((this.counter - 0.1).toFixed(2))));
        this.operatorTimeout = setTimeout(() => this._operatorEmitNextElementAfterTimeout(e), 3000);
      }
    }
  }

  private _operatorEmitNextElementAfterTimeout(e: ElementInConveyor): void {
    this.elementsInConveyor.push({
      type: e.type,
      value: this.elementInStandBy,
      x: 350,
      conveyorId: e.conveyorId,
    } as ElementInConveyor);
    this.elementInStandBy = '';

    this.counter = 3;
    this.counterSubscription!.unsubscribe();
    this.counterSubscription = undefined;
  }

  public onSubscribe(isSubscribed: boolean) {
    this.conveyorWorking$.next(isSubscribed);
    this.controllerButtons.forEach((button) => (button.enabled = isSubscribed));

    this.elementInStandBy = '';
    this.elementsInConveyor.length = 0;

    this.counter = 3;

    if (!isSubscribed) {
      if (this.counterSubscription != null) {
        this.counterSubscription.unsubscribe();
        this.counterSubscription = undefined;
      }
      if (this.operatorTimeout != null) {
        clearTimeout(this.operatorTimeout);
        this.operatorTimeout = undefined;
      }
    }
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR || button.type === ObservableEventType.COMPLETE) {
      this._onErrorCompleteControllerButtonClick();
    }

    this.elementsInConveyor.push({
      conveyorId: button.controllerId,
      type: button.type,
      value: button.value,
      x: 220,
    } as ElementInConveyor);
  }

  private _onErrorCompleteControllerButtonClick() {
    this.controllerButtons.forEach((button) => (button.enabled = false));

    this.elementsInConveyor = this.elementsInConveyor.filter((e) => e.x >= 350);
    this.elementInStandBy = '';

    if (this.counterSubscription != null) {
      this.counterSubscription.unsubscribe();
      this.counterSubscription = undefined;
    }
    if (this.operatorTimeout != null) {
      clearTimeout(this.operatorTimeout);
      this.operatorTimeout = undefined;
    }
  }
}
