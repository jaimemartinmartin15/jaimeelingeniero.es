import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservableComponent } from './observable.component';
import { ObservableRoutingModule } from './observable-routing.module';

@NgModule({
  imports: [CommonModule, ObservableRoutingModule],
  declarations: [ObservableComponent]
})
export class ObservableModule {}
