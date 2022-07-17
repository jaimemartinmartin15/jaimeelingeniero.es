import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { CombineLatestWithComponent } from './combine-latest-with.component';
import { CombineLatestWithRoutingModule } from './combine-latest-with-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, CombineLatestWithRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [CombineLatestWithComponent],
})
export class CombineLatestWithModule {}
