import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { IfRoutingModule } from './if-routing.module';
import { IfComponent } from './if.component';

@NgModule({
  imports: [CommonModule, IfRoutingModule, TerminalCodeModule],
  declarations: [IfComponent],
})
export class IfModule {}
