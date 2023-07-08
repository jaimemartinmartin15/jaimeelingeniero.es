import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { BehaviorSubject, Subject, <%= name %> } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss'],
})
export class <%= classify(name) %>Component extends BaseOperatorComponent {
  protected operator = <%= name %>();

  public readonly controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ]
  };

  public readonly conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

  public constructor(metaService: Meta) {
    super(metaService, '<%= name %>');
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
