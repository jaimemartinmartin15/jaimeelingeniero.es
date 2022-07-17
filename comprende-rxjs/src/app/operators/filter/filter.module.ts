import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { FilterComponent } from './filter.component';
import { FilterRoutingModule } from './filter-routing.module';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, FilterRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [FilterComponent],
})
export class FilterModule {}