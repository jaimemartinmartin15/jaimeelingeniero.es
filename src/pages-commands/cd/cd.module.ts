import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { CdRoutingModule } from './cd-routing.module';
import { CdComponent } from './cd.component';
import { ImageFullScreenModule } from 'src/shared/directives/image-full-screen/image-full-screen.module';

@NgModule({
  imports: [CommonModule, CdRoutingModule, TerminalCodeModule, ImageFullScreenModule],
  declarations: [CdComponent],
})
export class CdModule {}
