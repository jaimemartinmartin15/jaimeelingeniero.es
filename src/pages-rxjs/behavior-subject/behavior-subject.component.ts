import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html',
  styleUrls: ['./behavior-subject.component.scss'],
})
export class BehaviorSubjectComponent implements OnInit, AfterViewInit {
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

  public behaviorSubjectDemo$ = new BehaviorSubject<string>('🥝');
  public demoSubscriptions: any = {};

  public elementsInConveyor: ElementInConveyor[] = [];

  public speechBubble$ = {
    [this.S1]: new Subject<SpeechBubble>(),
    [this.S2]: new Subject<SpeechBubble>(),
    [this.S3]: new Subject<SpeechBubble>(),
  };

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('BehaviorSubject rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación de un BehaviorSubject' });
  }

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.y += this.demo.speed;
        if (e.y >= 370) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          if (e.type === ObservableEventType.NEXT) {
            this.behaviorSubjectDemo$.next(e.value);
          } else {
            if (e.type === ObservableEventType.ERROR) {
              this.conveyorWorking$.next(false);
            } else if (e.type === ObservableEventType.COMPLETE) {
              this.conveyorWorking$.next(false);
            }
            Object.values(this.controllerButtons).forEach((button) => (button.enabled = false));
            this.elementsInConveyor.length = 0;
            this.behaviorSubjectDemo$.complete();
          }
        }
      });
    });
  }

  public onSubscribe(subscriberId: string, isSubscribed: boolean) {
    if (isSubscribed) {
      this.demoSubscriptions[subscriberId] = this.behaviorSubjectDemo$.subscribe({
        next: (value) =>
          this.speechBubble$[subscriberId].next({
            message: value,
            type: ObservableEventType.NEXT,
          }),
        error: (value) =>
          this.speechBubble$[subscriberId].next({
            message: value,
            type: ObservableEventType.ERROR,
          }),
        complete: () =>
          this.speechBubble$[subscriberId].next({
            message: this.controllerButtons[1].value,
            type: ObservableEventType.COMPLETE,
          }),
      });
    } else {
      this.demoSubscriptions[subscriberId].unsubscribe();
    }
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
