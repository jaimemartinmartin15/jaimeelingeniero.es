import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConveyorComponent } from './conveyor/conveyor.component';
import { ConveyorControllerComponent } from './conveyor-controller/conveyor-controller.component';
import { SubscriberComponent } from './subscriber/subscriber.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ConveyorComponent, ConveyorControllerComponent, SubscriberComponent],
  exports: [ConveyorComponent, ConveyorControllerComponent, SubscriberComponent],
})
export class RxjsComponentsModule {}
