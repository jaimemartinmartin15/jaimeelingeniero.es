import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { DebounceTimeComponent } from './debounce-time.component';
import { DebounceTimeRoutingModule } from './debounce-time-routing.module';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, DebounceTimeRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [DebounceTimeComponent],
})
export class DebounceTimeModule {}