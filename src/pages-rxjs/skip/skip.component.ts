import { Component } from '@angular/core';
import { BehaviorSubject, skip } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-skip',
  templateUrl: './skip.component.html',
  styleUrls: ['./skip.component.scss'],
})
export class SkipComponent extends BaseOperatorComponent {
  public counterSkip = 3;
  public readonly counterSkipEmojis = ['1️⃣', '2️⃣', '3️⃣'];
  protected operator = skip(3);

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍓', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍋', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🥦', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

  protected moveElement(e: ElementInConveyor): void {
    e.x += this.demo.speed;
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    return e.x >= 300 && e.x <= 320;
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    return e.x >= 450;
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    this.elementsInConveyor.push({ conveyorId, type, value, x: 220 } as ElementInConveyor);
  }

  public override onSubscribeHook() {
    this.counterSkip = 3;
  }

  public override elementReachesOperatorNextHook(e: ElementInConveyor): void {
    this.counterSkip--;
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 350,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverErrorEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.ERROR,
      value,
      x: 350,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverCompleteEvent(): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.COMPLETE,
      value: this.controllerButtons[this.MAIN_ID][1].value,
      x: 350,
    } as ElementInConveyor);
  }
}
