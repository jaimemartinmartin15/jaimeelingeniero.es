import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { BehaviorSubjectComponent } from './behavior-subject.component';
import { BehaviorSubjectRoutingModule } from './behavior-subject-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, BehaviorSubjectRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [BehaviorSubjectComponent],
})
export class BehaviorSubjectModule {}