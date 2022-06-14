import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { TakeUntilComponent } from './take-until.component';
import { TakeUntilRoutingModule } from './take-until-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, TakeUntilRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [TakeUntilComponent],
})
export class TakeUntilModule {}