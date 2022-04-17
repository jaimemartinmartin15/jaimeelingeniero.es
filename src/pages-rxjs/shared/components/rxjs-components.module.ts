import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConveyorComponent } from './conveyor/conveyor.component';
import { ConveyorControllerComponent } from './conveyor-controller/conveyor-controller.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { ConveyorVerticalComponent } from './conveyor-vertical/conveyor-vertical.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ConveyorComponent, ConveyorVerticalComponent, ConveyorControllerComponent, SubscriberComponent],
  exports: [ConveyorComponent, ConveyorVerticalComponent, ConveyorControllerComponent, SubscriberComponent],
})
export class RxjsComponentsModule {}
