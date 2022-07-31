import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { FromComponent } from './from.component';
import { FromRoutingModule } from './from-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, FromRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [FromComponent],
})
export class FromModule {}