import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConveyorComponent } from './conveyor/conveyor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ConveyorComponent],
  exports: [ConveyorComponent],
})
export class RxjsComponentsModule {}
