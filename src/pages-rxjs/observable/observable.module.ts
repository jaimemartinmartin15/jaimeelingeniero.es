import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservableComponent } from './observable.component';
import { ObservableRoutingModule } from './observable-routing.module';
import { RxjsComponentsModule } from '../shared/components/rxjs-components.module';

@NgModule({
  imports: [CommonModule, ObservableRoutingModule, RxjsComponentsModule],
  declarations: [ObservableComponent],
})
export class ObservableModule {}
