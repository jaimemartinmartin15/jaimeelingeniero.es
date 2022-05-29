import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, debounceTime, interval, Observable, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-debounce-time',
  templateUrl: './debounce-time.component.html',
  styleUrls: ['./debounce-time.component.scss'],
})
export class DebounceTimeComponent implements AfterViewInit {
  public ID = '0';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public controllerButtons: ButtonController[] = [
    { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.ID, enabled: false },
    { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.ID, enabled: false },
    { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍇', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
  ];

  public conveyorWorking$ = new BehaviorSubject<boolean>(false);

  private previousTimeOut: ReturnType<typeof setTimeout>;

  public elementsInConveyor: ElementInConveyor[] = [];
  public elementInStandBy: string;

  public speechBubble$ = new Subject<SpeechBubble>();

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.x += this.demo.speed;
        if (e.x >= 300 && e.x < 320) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          this.elementInStandBy = e.value;

          if (this.previousTimeOut != null) {
            clearTimeout(this.previousTimeOut);
          }

          this.previousTimeOut = setTimeout(() => {
            this.elementsInConveyor.push({
              type: e.type,
              value: e.value,
              x: 350,
              conveyorId: e.conveyorId,
            } as ElementInConveyor);
            this.elementInStandBy = '';
          }, 3000);
        } else if (e.x >= 450) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          if (e.type === ObservableEventType.ERROR || e.type === ObservableEventType.COMPLETE) {
            this.onSubscribe(false);
          }
          this.speechBubble$.next({
            type: e.type,
            message: e.value,
          });
        }
      });
    });
  }

  public onSubscribe(isSubscribed: boolean) {
    this.conveyorWorking$.next(isSubscribed);
    this.controllerButtons.forEach((b) => (b.enabled = isSubscribed));
    this.elementsInConveyor.length = 0;
    this.elementInStandBy = '';
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR || button.type === ObservableEventType.COMPLETE) {
      this.controllerButtons.forEach((b) => (b.enabled = false));
    }

    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      x: 220,
      conveyorId: button.controllerId,
    } as ElementInConveyor);
  }
}
