import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { SkipComponent } from './skip.component';
import { SkipRoutingModule } from './skip-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, SkipRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [SkipComponent],
})
export class SkipModule {}