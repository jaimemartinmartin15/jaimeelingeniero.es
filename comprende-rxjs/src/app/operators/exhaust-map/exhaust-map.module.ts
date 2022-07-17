import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhaustMapComponent } from './exhaust-map.component';
import { ExhaustMapRoutingModule } from './exhaust-map-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, ExhaustMapRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [ExhaustMapComponent],
})
export class ExhaustMapModule {}
