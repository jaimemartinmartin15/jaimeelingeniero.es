import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponent } from './sql.component';
import { SqlRoutingModule } from './sql-routing.module';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';
import { TerminalCodeModule } from 'src/components/terminal-code/terminal-code.module';
import { ResponsiveLayoutModule } from 'src/components/responsive-layout/responsive-layout.module';

@NgModule({
  imports: [CommonModule, SqlRoutingModule, HeaderPrintModule, TerminalCodeModule, ResponsiveLayoutModule],
  declarations: [SqlComponent],
})
export class SqlModule {}
