import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapsibleModule } from 'src/components/collapsible/collapsible.module';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';
import { ResponsiveLayoutModule } from 'src/components/responsive-layout/responsive-layout.module';
import { TerminalCodeModule } from 'src/components/terminal-code/terminal-code.module';
import { SqlRoutingModule } from './sql-routing.module';
import { SqlComponent } from './sql.component';

@NgModule({
  imports: [CommonModule, SqlRoutingModule, HeaderPrintModule, TerminalCodeModule, ResponsiveLayoutModule, CollapsibleModule],
  declarations: [SqlComponent],
})
export class SqlModule {}
