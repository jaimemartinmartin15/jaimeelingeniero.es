import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/components/terminal-code/terminal-code.module';
import { FindRoutingModule } from './find-routing.module';
import { FindComponent } from './find.component';

@NgModule({
  imports: [CommonModule, FindRoutingModule, TerminalCodeModule],
  declarations: [FindComponent],
})
export class FindModule {}
