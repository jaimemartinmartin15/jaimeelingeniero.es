import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { SwitchMapComponent } from './switch-map.component';
import { SwitchMapRoutingModule } from './switch-map-routing.module';
import { RxjsComponentsModule } from '../../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, SwitchMapRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [SwitchMapComponent],
})
export class SwitchMapModule {}
