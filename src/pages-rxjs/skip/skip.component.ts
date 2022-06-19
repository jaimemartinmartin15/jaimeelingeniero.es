import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-skip',
  templateUrl: './skip.component.html',
  styleUrls: ['./skip.component.scss'],
})
export class SkipComponent implements OnInit, AfterViewInit, OnDestroy {
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
  public counterSkip: number = 3;
  public readonly counterSkipEmojis = ['1️⃣', '2️⃣', '3️⃣'];

  public speechBubble$ = new Subject<SpeechBubble>();

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('Skip rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs skip' });
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
    if (this.counterSkip > 0) {
      this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
      this.counterSkip--;
    } else {
      e.x = 350;
    }
  }

  public onSubscribe(isSubscribed: boolean) {
    this.conveyorWorking$.next(isSubscribed);
    this.controllerButtons.forEach((b) => (b.enabled = isSubscribed));
    this.elementsInConveyor.length = 0;
    this.counterSkip = 3;
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.COMPLETE || button.type === ObservableEventType.ERROR) {
      this.controllerButtons.forEach((b) => (b.enabled = false));
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
