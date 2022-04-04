import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConveyorComponent } from './conveyor/conveyor.component';
import { ConveyorControllerComponent } from './conveyor-controller/conveyor-controller.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ConveyorComponent, ConveyorControllerComponent],
  exports: [ConveyorComponent, ConveyorControllerComponent],
})
export class RxjsComponentsModule {}
