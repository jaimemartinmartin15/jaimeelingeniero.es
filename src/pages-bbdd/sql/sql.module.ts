import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapsibleModule } from 'src/shared/components/collapsible/collapsible.module';
import { HeaderPrintModule } from 'src/shared/components/header-print/header-print.module';
import { ResponsiveLayoutModule } from 'src/shared/components/responsive-layout/responsive-layout.module';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { SqlRoutingModule } from './sql-routing.module';
import { SqlComponent } from './sql.component';

@NgModule({
  imports: [CommonModule, SqlRoutingModule, HeaderPrintModule, TerminalCodeModule, ResponsiveLayoutModule, CollapsibleModule],
  declarations: [SqlComponent],
})
export class SqlModule {}
