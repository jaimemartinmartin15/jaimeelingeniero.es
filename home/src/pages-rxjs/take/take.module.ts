import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { TakeComponent } from './take.component';
import { TakeRoutingModule } from './take-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, TakeRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [TakeComponent],
})
export class TakeModule {}