import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { OfComponent } from './of.component';
import { OfRoutingModule } from './of-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, OfRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [OfComponent],
})
export class OfModule {}