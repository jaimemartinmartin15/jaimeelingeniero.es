import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderPrintModule } from 'src/shared/components/header-print/header-print.module';
import { ResponsiveLayoutModule } from 'src/shared/components/responsive-layout/responsive-layout.module';
import { CommandsLayoutPageRoutingModule } from './commands-layout-page-routing.module';
import { CommandsLayoutPageComponent } from './commands-layout-page.component';

@NgModule({
  imports: [CommonModule, CommandsLayoutPageRoutingModule, ResponsiveLayoutModule, HeaderPrintModule],
  declarations: [CommandsLayoutPageComponent],
})
export class CommandsLayoutPageModule {}
