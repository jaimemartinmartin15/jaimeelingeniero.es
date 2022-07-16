import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { SampleTimeComponent } from './sample-time.component';
import { SampleTimeRoutingModule } from './sample-time-routing.module';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, SampleTimeRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [SampleTimeComponent],
})
export class SampleTimeModule {}