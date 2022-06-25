import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
import { capitalizeFirstLetter } from 'src/utils/strings';
import { ButtonController } from './components/conveyor-controller/button-controller';
import { DemoContainerComponent } from './components/demo-container/demo-container.component';
import { ElementInConveyor } from './element-in-conveyor';
import { ObservableEventType } from './observable-event-type';
import { SpeechBubble } from './speech-bubble';

@Component({
  template: '',
})
export abstract class BaseOperatorComponent implements OnInit, AfterViewInit, OnDestroy {
  public MAIN_ID = '0';

  @ViewChild(DemoContainerComponent)
  public demo: DemoContainerComponent;

  public speechBubble$ = new Subject<SpeechBubble>();

  protected abstract operator: any;
  private demoSubscription: Subscription;

  protected elementReachesOperator$: Subject<string>;

  public abstract conveyorsWorking: { [key: string]: BehaviorSubject<boolean> };
  public abstract controllerButtons: { [key: string]: ButtonController[] };

  public elementsInConveyor: ElementInConveyor[] = [];

  public constructor(
    protected readonly titleService: Title,
    protected readonly metaService: Meta,
    @Inject(String) private readonly operatorName: string
  ) {}

  public ngOnInit() {
    this.titleService.setTitle(`${capitalizeFirstLetter(this.operatorName)} rxjs`);
    this.metaService.updateTag({ name: 'description', content: `Explicación del operador rxjs ${this.operatorName}` });
  }

  public ngAfterViewInit() {
    interval(this.demo.fps).subscribe(() => {
      this.elementsInConveyor.forEach((e) => {
        this.moveElement(e);
        if (this.isElementDeliveredToOperator(e)) {
          this._elementReachesOperator(e);
        } else if (this.isElementDeliveredToSubscriber(e)) {
          this._elementDeliveredToSubscriber(e);
        }
      });
    });
  }

  protected abstract moveElement(e: ElementInConveyor): void;
  protected abstract isElementDeliveredToOperator(e: ElementInConveyor): boolean;
  protected abstract isElementDeliveredToSubscriber(e: ElementInConveyor): boolean;

  private _elementReachesOperator(e: ElementInConveyor) {
    this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
    if (e.conveyorId === this.MAIN_ID) {
      if (e.type === ObservableEventType.NEXT) {
        this.elementReachesOperator$.next(e.value);
      } else if (e.type === ObservableEventType.ERROR) {
        this.elementReachesOperator$.error(e.value);
      } else {
        this.elementReachesOperator$.complete();
      }
    } else {
      this.onOperatorConveyorDeliverElement(e);
    }
  }

  protected abstract onOperatorConveyorDeliverElement(e: ElementInConveyor): void;

  protected _elementDeliveredToSubscriber(e: ElementInConveyor) {
    this.elementsInConveyor.splice(this.elementsInConveyor.indexOf(e), 1);
    this.speechBubble$.next({
      message: e.value,
      type: e.type,
    });

    if (e.type !== ObservableEventType.NEXT) {
      this.onSubscribe(false);
    }
  }

  public onSubscribe(isSubscription: boolean): void {
    Object.values(this.controllerButtons).forEach((buttons) => buttons.forEach((button) => (button.enabled = isSubscription)));
    Object.values(this.conveyorsWorking).forEach((c) => c.next(isSubscription));
    this.elementsInConveyor.length = 0;

    this.onSubscribeHook(isSubscription);

    if (!isSubscription) {
      this.demoSubscription.unsubscribe();
    } else {
      this.elementReachesOperator$ = new Subject();
      this.demoSubscription = this.elementReachesOperator$.pipe(this.operator).subscribe({
        next: (value) => this.onOperatorDeliverNextEvent(value as string),
        error: (value) => this.onOperatorDeliverErrorEvent(value),
        complete: () => this.onOperatorDeliverCompleteEvent(),
      });
    }
  }

  protected abstract onSubscribeHook(isSubscription: boolean): void;

  protected abstract onOperatorDeliverNextEvent(value: string): void;
  protected abstract onOperatorDeliverErrorEvent(value: string): void;
  protected abstract onOperatorDeliverCompleteEvent(): void;

  public onControllerButtonClick(button: ButtonController) {
    this.addElementToBeginningOfConveyor(button.controllerId, button.type, button.value);
  }

  protected abstract addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string): void;

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
  }
}
