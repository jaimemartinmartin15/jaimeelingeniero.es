import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { SubjectComponent } from './subject.component';
import { SubjectRoutingModule } from './subject-routing.module';

@NgModule({
  imports: [CommonModule, SubjectRoutingModule, HighlightJsModule],
  declarations: [SubjectComponent],
})
export class SubjectModule {}