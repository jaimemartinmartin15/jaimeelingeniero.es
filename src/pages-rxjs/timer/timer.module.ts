import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { TimerComponent } from './timer.component';
import { TimerRoutingModule } from './timer-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, TimerRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [TimerComponent],
})
export class TimerModule {}