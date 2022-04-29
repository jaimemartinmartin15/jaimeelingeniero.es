import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { ObservableComponent } from './observable.component';
import { ObservableRoutingModule } from './observable-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, ObservableRoutingModule, RxjsComponentsModule, HighlightJsModule],
  declarations: [ObservableComponent],
})
export class ObservableModule {}
