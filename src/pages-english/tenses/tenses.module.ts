import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TensesComponent } from './tenses.component';
import { TensesRoutingModule } from './tenses-routing.module';

@NgModule({
  imports: [CommonModule, TensesRoutingModule],
  declarations: [TensesComponent],
})
export class TensesModule {}
