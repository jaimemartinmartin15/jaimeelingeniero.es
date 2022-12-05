import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
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
  public headerPrintData = { author: 'Jaime Martín Martín', date: '18 de julio de 2022' };

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

  public subjectDemo$ = new Subject<string>();
  public demoSubscriptions: any = {};

  public elementsInConveyor: ElementInConveyor[] = [];

  public speechBubble$ = {
    [this.S1]: new Subject<SpeechBubble>(),
    [this.S2]: new Subject<SpeechBubble>(),
    [this.S3]: new Subject<SpeechBubble>(),
  };

  public constructor(private readonly metaService: Meta) {}

  public ngOnInit() {
    this.metaService.updateTag({ name: 'description', content: 'Explicación de un Subject' });
    this.metaService.updateTag({ name: 'keywords', content: `subject, demo, rxjs` });
  }

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.y += this.demo.speed;
        if (e.y >= 355) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          if (e.type === ObservableEventType.NEXT) {
            this.subjectDemo$.next(e.value);
          } else {
            if (e.type === ObservableEventType.ERROR) {
              this.subjectDemo$.error(e.value);
            } else if (e.type === ObservableEventType.COMPLETE) {
              this.subjectDemo$.complete();
            }
            this.conveyorWorking$.next(false);
            Object.values(this.controllerButtons).forEach((button) => (button.enabled = false));
            this.elementsInConveyor.length = 0;
          }
        }
      });
    });
  }

  public onSubscribe(subscriberId: string, isSubscribed: boolean) {
    if (isSubscribed) {
      this.demoSubscriptions[subscriberId] = this.subjectDemo$.subscribe({
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

  public resetDemo() {
    this.subjectDemo$ = new Subject();
    this.conveyorWorking$.next(true);
    this.elementsInConveyor.length = 0;
    Object.values(this.demoSubscriptions).forEach((subscription) => (subscription as Subscription).unsubscribe());
    Object.values(this.controllerButtons).forEach((button) => (button.enabled = true));
    Object.values(this.speechBubble$).forEach((speechBubble) =>
      speechBubble.next({
        message: '',
        type: ObservableEventType.NONE,
      })
    );
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}
