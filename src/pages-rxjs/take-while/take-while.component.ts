import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject, Subscription, takeWhile } from 'rxjs';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { DemoContainerComponent } from '../shared/components/demo-container/demo-container.component';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-take-while',
  templateUrl: './take-while.component.html',
  styleUrls: ['./take-while.component.scss'],
})
export class TakeWhileComponent implements OnInit, AfterViewInit, OnDestroy {
  public ID = '0';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  private demoSubscription: Subscription;
  private elementReachesOperator$: Subject<ElementInConveyor>;

  public controllerButtons: ButtonController[] = [
    { value: '🎻', type: ObservableEventType.ERROR, controllerId: this.ID, enabled: false },
    { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.ID, enabled: false },
    { value: '🥦', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍐', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
    { value: '🍋', type: ObservableEventType.NEXT, controllerId: this.ID, enabled: false },
  ];

  public conveyorWorking$ = new BehaviorSubject<boolean>(false);

  public elementsInConveyor: ElementInConveyor[] = [];

  public speechBubble$ = new Subject<SpeechBubble>();

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('TakeWhile rxjs');
    this.metaService.updateTag({ name: 'description', content: 'Explicación del operador rxjs takeWhile' });
  }

  public ngAfterViewInit() {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        e.x += this.demo.speed;

        if (e.x >= 300 && e.x <= 320) {
          this._elementReachesOperator(e);
        } else if (e.x >= 450) {
          this._elementDeliveredToSubscriber(e);
        }
      });
    });
  }

  private _elementDeliveredToSubscriber(e: ElementInConveyor) {
    this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
    this.speechBubble$.next({
      message: e.value,
      type: e.type,
    });

    if (e.type !== ObservableEventType.NEXT) {
      this.onSubscribe(false);
    }
  }

  private _elementReachesOperator(e: ElementInConveyor) {
    this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
    if (e.type === ObservableEventType.NEXT) {
      this.elementReachesOperator$.next(e);
    } else if (e.type === ObservableEventType.ERROR) {
      this.elementReachesOperator$.error(e);
    } else {
      this.elementReachesOperator$.complete();
    }
  }

  public onControllerButtonClick(button: ButtonController) {
    this.elementsInConveyor.push({
      type: button.type,
      value: button.value,
      x: 220,
      conveyorId: button.controllerId,
    } as ElementInConveyor);
  }

  public onSubscribe(isSubscription: boolean) {
    this.controllerButtons.forEach((button) => (button.enabled = isSubscription));
    this.elementsInConveyor.length = 0;
    this.conveyorWorking$.next(isSubscription);

    if (!isSubscription) {
      this.demoSubscription.unsubscribe();
    } else {
      this.elementReachesOperator$ = new Subject();
      this.demoSubscription = this.elementReachesOperator$.pipe(takeWhile((e) => e.value === '🥦' || e.value === '🍐')).subscribe({
        next: (e) => this.elementsInConveyor.push({ ...e, x: 350 }),
        error: (e) => this.elementsInConveyor.push({ ...e, x: 350 }),
        complete: () =>
          this.elementsInConveyor.push({
            type: ObservableEventType.COMPLETE,
            value: this.controllerButtons[1].value,
            conveyorId: this.ID,
            x: 350,
          } as ElementInConveyor),
      });
    }
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}