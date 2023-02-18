import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TensesComponent } from './tenses.component';
import { TensesRoutingModule } from './tenses-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TensesRoutingModule, ReactiveFormsModule],
  declarations: [TensesComponent],
})
export class TensesModule {}
