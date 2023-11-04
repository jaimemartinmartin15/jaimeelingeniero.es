import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { CdRoutingModule } from './cd-routing.module';
import { CdComponent } from './cd.component';

@NgModule({
  imports: [CommonModule, CdRoutingModule, TerminalCodeModule],
  declarations: [CdComponent],
})
export class CdModule {}
