import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { TakeWhileComponent } from './take-while.component';
import { TakeWhileRoutingModule } from './take-while-routing.module';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, TakeWhileRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [TakeWhileComponent],
})
export class TakeWhileModule {}