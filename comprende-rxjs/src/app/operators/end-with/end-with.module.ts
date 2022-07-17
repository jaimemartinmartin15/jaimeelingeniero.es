import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { EndWithComponent } from './end-with.component';
import { EndWithRoutingModule } from './end-with-routing.module';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, EndWithRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [EndWithComponent],
})
export class EndWithModule {}