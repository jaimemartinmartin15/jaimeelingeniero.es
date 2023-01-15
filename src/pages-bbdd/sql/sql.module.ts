import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponent } from './sql.component';
import { SqlRoutingModule } from './sql-routing.module';

@NgModule({
  imports: [CommonModule, SqlRoutingModule],
  declarations: [SqlComponent],
})
export class SqlModule {}
