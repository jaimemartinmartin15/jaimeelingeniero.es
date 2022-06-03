import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, interval, Subject, Subscription, tap } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-sample-time',
  templateUrl: './sample-time.component.html',
  styleUrls: ['./sample-time.component.scss'],
})
export class SampleTimeComponent implements AfterViewInit {
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
  public conveyorWorking$ = new BehaviorSubject<boolean>(false);

  public counter = 3;
  private counterSubscription: Subscription;

  public elementsInConveyor: ElementInConveyor[] = [];
  public elementInStandBy: string;

  public speechBubble$ = new Subject<SpeechBubble>();

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.x += this.demo.speed;

        if (e.x >= 300 && e.x < 320 && e.type === ObservableEventType.NEXT) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          this.elementInStandBy = e.value;
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
    this.counter = 3;

    if (isSubscribed) {
      this.counterSubscription = interval(100)
        .pipe(
          tap(() => {
            if (this.counter <= 0) {
              this.counter = 3;

              if (this.elementInStandBy !== '') {
                this.elementsInConveyor.push({
                  type: ObservableEventType.NEXT,
                  value: this.elementInStandBy,
                  x: 350,
                  conveyorId: this.ID,
                } as ElementInConveyor);
                this.elementInStandBy = '';
              }
            }
          })
        )
        .subscribe(() => (this.counter = parseFloat((this.counter - 0.1).toFixed(2))));
    } else {
      this.counterSubscription.unsubscribe();
    }
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR || button.type === ObservableEventType.COMPLETE) {
      this.controllerButtons.forEach((b) => (b.enabled = false));
      this.elementsInConveyor = this.elementsInConveyor.filter((e) => e.x >= 350);
      this.elementInStandBy = '';
    }

    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      x: 220,
      conveyorId: button.controllerId,
    } as ElementInConveyor);
  }
}
