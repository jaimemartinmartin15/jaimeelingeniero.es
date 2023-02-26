import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListModule } from './list/list.module';
import { RetrieveVerbsResolver } from './retrieve-verbs.resolver';
import { TensesRoutingModule } from './tenses-routing.module';
import { TensesComponent } from './tenses.component';

@NgModule({
  imports: [CommonModule, TensesRoutingModule, ReactiveFormsModule, HttpClientModule, ListModule],
  declarations: [TensesComponent],
  providers: [RetrieveVerbsResolver],
})
export class TensesModule {}
