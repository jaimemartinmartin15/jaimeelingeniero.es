import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { IntervalComponent } from './interval.component';
import { IntervalRoutingModule } from './interval-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, IntervalRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [IntervalComponent],
})
export class IntervalModule {}