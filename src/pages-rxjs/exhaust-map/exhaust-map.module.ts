import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhaustMapComponent } from './exhaust-map.component';
import { ExhaustMapRoutingModule } from './exhaust-map-routing.module';

@NgModule({
  imports: [CommonModule, ExhaustMapRoutingModule],
  declarations: [ExhaustMapComponent],
})
export class ExhaustMapModule {}
