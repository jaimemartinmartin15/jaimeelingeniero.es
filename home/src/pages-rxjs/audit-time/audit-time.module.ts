import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { AuditTimeComponent } from './audit-time.component';
import { AuditTimeRoutingModule } from './audit-time-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, AuditTimeRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [AuditTimeComponent],
})
export class AuditTimeModule {}