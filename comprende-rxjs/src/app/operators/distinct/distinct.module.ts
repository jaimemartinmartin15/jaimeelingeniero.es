import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { DistinctComponent } from './distinct.component';
import { DistinctRoutingModule } from './distinct-routing.module';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, DistinctRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [DistinctComponent],
})
export class DistinctModule {}