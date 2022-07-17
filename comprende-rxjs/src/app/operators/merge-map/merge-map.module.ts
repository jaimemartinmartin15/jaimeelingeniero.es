import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeMapComponent } from './merge-map.component';
import { MergeMapRoutingModule } from './merge-map-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, MergeMapRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [MergeMapComponent],
})
export class MergeMapModule {}
