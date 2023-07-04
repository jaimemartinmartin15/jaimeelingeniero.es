import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RainComponent } from './rain.component';
import { RainRoutingModule } from './rain-routing.module';

@NgModule({
  imports: [CommonModule, RainRoutingModule],
  declarations: [RainComponent],
})
export class RainModule {}
