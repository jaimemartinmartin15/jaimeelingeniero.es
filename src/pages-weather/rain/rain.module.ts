import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RainRoutingModule } from './rain-routing.module';
import { RainComponent } from './rain.component';

@NgModule({
  imports: [CommonModule, RainRoutingModule],
  declarations: [RainComponent],
})
export class RainModule {}
