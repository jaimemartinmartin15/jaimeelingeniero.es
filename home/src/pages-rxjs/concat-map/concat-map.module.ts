import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcatMapComponent } from './concat-map.component';
import { ConcatMapRoutingModule } from './concat-map-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, ConcatMapRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [ConcatMapComponent],
})
export class ConcatMapModule {}
