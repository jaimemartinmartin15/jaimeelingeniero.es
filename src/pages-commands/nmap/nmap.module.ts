import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { ImageFullScreenModule } from 'src/shared/directives/image-full-screen/image-full-screen.module';
import { NmapRoutingModule } from './nmap-routing.module';
import { NmapComponent } from './nmap.component';

@NgModule({
  imports: [CommonModule, NmapRoutingModule, TerminalCodeModule, ImageFullScreenModule],
  declarations: [NmapComponent],
})
export class NmapModule {}
