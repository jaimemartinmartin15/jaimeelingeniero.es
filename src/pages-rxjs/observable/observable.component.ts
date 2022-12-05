import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss'],
})
export class ObservableComponent implements OnInit, AfterViewInit, OnDestroy {
  public headerPrintData = { author: 'Jaime Martín Martín', date: '2 de abril de 2022' };

  public ID = '0';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public controllerButtons: ButtonController[] = [
    { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.ID, enabled: false },
    { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.ID, enabled: false },
    { value: '🍐', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍍', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍇', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
  ];

  public conveyorWorking$ = new BehaviorSubject<boolean>(false);

  public elementsInConveyor: ElementInConveyor[] = [];

  public speechBubble$ = new Subject<SpeechBubble>();

  public constructor(private readonly metaService: Meta) {}

  public ngOnInit() {
    this.metaService.updateTag({ name: 'description', content: 'Explicación de un Observable' });
    this.metaService.updateTag({ name: 'keywords', content: `observable, demo, rxjs` });
  }

  public ngAfterViewInit(): void {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.x += this.demo.speed;
        if (e.x >= 450) {
          this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
          this.speechBubble$.next({
            type: e.type,
            message: e.value,
          });
          if (e.type === ObservableEventType.ERROR || e.type === ObservableEventType.COMPLETE) {
            this.onSubscribe(false);
          }
        }
      });
    });
  }

  public onSubscribe(isSubscribed: boolean) {
    this.conveyorWorking$.next(isSubscribed);
    this.controllerButtons.forEach((b) => (b.enabled = isSubscribed));
    this.elementsInConveyor.length = 0;
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR || button.type === ObservableEventType.COMPLETE) {
      this.controllerButtons.forEach((b) => (b.enabled = false));
    }

    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      x: 220,
      y: 136,
      conveyorId: button.controllerId,
    });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}
