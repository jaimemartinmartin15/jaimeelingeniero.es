import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConveyorHorizontalComponent } from './conveyor/horizontal/conveyor-horizontal.component';
import { ConveyorControllerComponent } from './conveyor-controller/conveyor-controller.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { ConveyorVerticalComponent } from './conveyor/vertical/conveyor-vertical.component';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { OperatorComponent } from './operator/operator.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ConveyorHorizontalComponent,
    ConveyorVerticalComponent,
    ConveyorControllerComponent,
    SubscriberComponent,
    DemoContainerComponent,
    OperatorComponent,
  ],
  exports: [
    ConveyorHorizontalComponent,
    ConveyorVerticalComponent,
    ConveyorControllerComponent,
    SubscriberComponent,
    DemoContainerComponent,
    OperatorComponent,
  ],
})
export class RxjsComponentsModule {}
