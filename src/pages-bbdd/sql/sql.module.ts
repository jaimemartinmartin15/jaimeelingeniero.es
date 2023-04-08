import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponent } from './sql.component';
import { SqlRoutingModule } from './sql-routing.module';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';

@NgModule({
  imports: [CommonModule, SqlRoutingModule, HeaderPrintModule, TerminalCodeModule],
  declarations: [SqlComponent],
})
export class SqlModule {}
