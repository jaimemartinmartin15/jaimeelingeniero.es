import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForkJoinComponent } from './fork-join.component';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';
import { ForkJoinRoutingModule } from './fork-join-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  imports: [CommonModule, ForkJoinRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [ForkJoinComponent],
})
export class ForkJoinModule {}
