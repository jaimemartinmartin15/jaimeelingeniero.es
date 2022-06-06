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

  public conveyorWorking$ = new BehaviorSubject<boolean>(false);

  public elementsInConveyor: ElementInConveyor[] = [];
  public elementInStandBy: string;

  public speechBubble$ = new Subject<SpeechBubble>();

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.x++;

        if (e.x >= 300 && e.x < 320) {
          this._elementReachesAuditTimeOperator(e);
        }
      });
    });
  }

  private _elementReachesAuditTimeOperator(e: ElementInConveyor) {
    if (!this.controllerButtons[1].enabled) {
      this._elementReachesAuditTimeOperatorWithObservableCompleted(e);
    } else {
      // TODO
    }
  }

  private _elementReachesAuditTimeOperatorWithObservableCompleted(e: ElementInConveyor) {
    // TODO
  }

  public onSubscribe(isSubscribed: boolean) {
    this.conveyorWorking$.next(isSubscribed);
    this.controllerButtons.forEach((button) => (button.enabled = isSubscribed));

    this.elementInStandBy = '';
    this.elementsInConveyor.length = 0;
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR) {
      this._onErrorControllerButtonClick(button);
    } else if (button.type === ObservableEventType.ERROR) {
      this._onCompleteControllerButtonClick(button);
    }

    // NEXT elements are simply added

    this.elementsInConveyor.push({
      conveyorId: button.controllerId,
      type: button.type,
      value: button.value,
      x: 220,
    } as ElementInConveyor);
  }

  private _onErrorControllerButtonClick(button: ButtonController) {
    this.controllerButtons.forEach((button) => (button.enabled = false));
  }

  private _onCompleteControllerButtonClick(button: ButtonController) {
    this.controllerButtons.forEach((button) => (button.enabled = false));
  }
}
