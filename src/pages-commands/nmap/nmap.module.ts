import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { NmapRoutingModule } from './nmap-routing.module';
import { NmapComponent } from './nmap.component';

@NgModule({
  imports: [CommonModule, NmapRoutingModule, TerminalCodeModule],
  declarations: [NmapComponent],
})
export class NmapModule {}
