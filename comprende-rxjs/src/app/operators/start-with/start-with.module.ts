import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartWithComponent } from './start-with.component';
import { StartWithRoutingModule } from './start-with-routing.module';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  imports: [CommonModule, StartWithRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [StartWithComponent],
})
export class StartWithModule {}
