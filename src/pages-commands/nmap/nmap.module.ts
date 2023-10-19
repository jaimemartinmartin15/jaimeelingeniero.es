import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { NmapRoutingModule } from './nmap-routing.module';
import { Nmap } from './nmap.component';

@NgModule({
  imports: [CommonModule, NmapRoutingModule, TerminalCodeModule],
  declarations: [Nmap],
})
export class Nmap {}
