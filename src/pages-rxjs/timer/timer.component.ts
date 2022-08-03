import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, timer } from 'rxjs';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { BaseOperatorComponent } from '../shared/base-operator.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent extends BaseOperatorComponent {
  public readonly today = new Date();

  protected operator = timer(200);

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {};

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

  public constructor(titleService: Title, metaService: Meta) {
    super(titleService, metaService, 'timer');
  }

  protected moveElement(e: ElementInConveyor): void {
    // TODO
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    // TODO
    return false;
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    // TODO
    return false;
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    // TODO
  }

  public override elementReachesOperatorNextHook(e: ElementInConveyor) {
    // TODO
  }

  public override elementReachesOperatorErrorHook(e: ElementInConveyor) {
    // TODO
  }

  public override elementReachesOperatorCompleteHook(e: ElementInConveyor) {
    // TODO
  }

  public override onOperatorConveyorDeliverElement(e: ElementInConveyor) {
    // TODO
  }

  public override onSubscribeHook() {
    // TODO
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    // TODO
  }

  protected onOperatorDeliverErrorEvent(value: string): void {
    // TODO
  }

  protected onOperatorDeliverCompleteEvent(): void {
    // TODO
  }
}
