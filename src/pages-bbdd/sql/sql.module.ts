import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponent } from './sql.component';
import { SqlRoutingModule } from './sql-routing.module';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';

@NgModule({
  imports: [CommonModule, SqlRoutingModule, HeaderPrintModule],
  declarations: [SqlComponent],
})
export class SqlModule {}
