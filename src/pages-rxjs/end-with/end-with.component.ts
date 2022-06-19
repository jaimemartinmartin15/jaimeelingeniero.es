import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-end-with',
  templateUrl: './end-with.component.html',
  styleUrls: ['./end-with.component.scss'],
})
export class EndWithComponent implements OnInit, AfterViewInit, OnDestroy {
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

  public elementsInConveyor: ElementInConveyor[] = [];

  public speechBubble$ = new Subject<SpeechBubble>();

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('EndWith rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs endWith' });
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

      if (button.type === ObservableEventType.COMPLETE) {
        this.elementsInConveyor.push({
          type: ObservableEventType.NEXT,
          value: '🍐',
          x: 220,
          conveyorId: button.controllerId,
        } as ElementInConveyor);

        setTimeout(
          () =>
            this.elementsInConveyor.push({
              type: button.type,
              value: button.value,
              x: 220,
              conveyorId: button.controllerId,
            } as ElementInConveyor),
          1000 / this.demo.speed
        );

        return;
      }
    }

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
