import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TensesRoutingModule } from './tenses-routing.module';
import { TensesComponent } from './tenses.component';

@NgModule({
  imports: [CommonModule, TensesRoutingModule, ReactiveFormsModule, HttpClientModule],
  declarations: [TensesComponent],
})
export class TensesModule {}
