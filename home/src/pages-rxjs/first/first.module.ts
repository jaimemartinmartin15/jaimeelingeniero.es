import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { FirstComponent } from './first.component';
import { FirstRoutingModule } from './first-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, FirstRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [FirstComponent],
})
export class FirstModule {}