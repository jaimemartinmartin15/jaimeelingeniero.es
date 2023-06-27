import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { FindRoutingModule } from './find-routing.module';
import { FindComponent } from './find.component';

@NgModule({
  imports: [CommonModule, FindRoutingModule, HeaderPrintModule, TerminalCodeModule],
  declarations: [FindComponent],
})
export class FindModule {}
