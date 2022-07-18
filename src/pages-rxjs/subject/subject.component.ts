import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit, AfterViewInit {
  public S1 = '0';
  public S2 = '1';
  public S3 = '2';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public controllerButtons: ButtonController[] = [
    { value: '🧲', type: ObservableEventType.ERROR, controllerId: '', enabled: true },
    { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: '', enabled: true },
    { value: '🍐', type: ObservableEventType.NEXT, controllerId: '', enabled: true },
    { value: '🍍', type: ObservableEventType.NEXT, controllerId: '', enabled: true },
    { value: '🍇', type: ObservableEventType.NEXT, controllerId: '', enabled: true },
  ];

  public conveyorWorking$ = new BehaviorSubject<boolean>(true);

  public elementsInConveyor: ElementInConveyor[] = [];

  public subscriptionsStatus = {
    [this.S1]: false,
    [this.S2]: false,
    [this.S3]: false,
  };

  public speechBubble$ = {
    [this.S1]: new Subject<SpeechBubble>(),
    [this.S2]: new Subject<SpeechBubble>(),
    [this.S3]: new Subject<SpeechBubble>(),
  };

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('Subject rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación un Subject' });
  }

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.y += this.demo.speed;
        if (e.y >= 430) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          Object.values(this.speechBubble$).forEach((speechBubble, index) => {
            // S1, S2 or S3
            if (this.subscriptionsStatus[`${index}`]) {
              speechBubble.next({
                type: e.type,
                message: e.value,
              });
            }
          });
          if (e.type === ObservableEventType.ERROR || e.type === ObservableEventType.COMPLETE) {
            this.controllerButtons.forEach((button) => (button.enabled = false));
            this.conveyorWorking$.next(false);
            this.elementsInConveyor.length = 0;
            Object.keys(this.subscriptionsStatus).forEach((key) => (this.subscriptionsStatus[key] = false));
          }
        }
      });
    });
  }

  public onSubscribe(subscriberId: string, isSubscribed: boolean) {
    this.subscriptionsStatus[subscriberId] = isSubscribed;
    this.conveyorWorking$.next(true);
    this.controllerButtons.forEach((button) => (button.enabled = true));
  }

  public onControllerButtonClick(button: ButtonController) {
    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      x: 370,
      y: 170,
      conveyorId: button.controllerId,
    });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
