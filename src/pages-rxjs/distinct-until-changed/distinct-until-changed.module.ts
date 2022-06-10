import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { DistinctUntilChangedComponent } from './distinct-until-changed.component';
import { DistinctUntilChangedRoutingModule } from './distinct-until-changed-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, DistinctUntilChangedRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [DistinctUntilChangedComponent],
})
export class DistinctUntilChangedModule {}