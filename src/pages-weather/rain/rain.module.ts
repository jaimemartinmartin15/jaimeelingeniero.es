import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RainComponent } from './rain.component';
import { RainRoutingModule } from './rain-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, RainRoutingModule, HttpClientModule],
  declarations: [RainComponent],
})
export class RainModule {}
