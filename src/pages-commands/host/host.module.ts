import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';

@NgModule({
  imports: [CommonModule, HostRoutingModule, TerminalCodeModule],
  declarations: [HostComponent],
})
export class HostModule {}
