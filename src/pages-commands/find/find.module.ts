import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { FindRoutingModule } from './find-routing.module';
import { FindComponent } from './find.component';

@NgModule({
  imports: [CommonModule, FindRoutingModule, TerminalCodeModule],
  declarations: [FindComponent],
})
export class FindModule {}
