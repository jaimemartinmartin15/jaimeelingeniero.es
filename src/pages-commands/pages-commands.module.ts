import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderPrintModule } from 'src/shared/components/header-print/header-print.module';
import { ResponsiveLayoutModule } from 'src/shared/components/responsive-layout/responsive-layout.module';
import { PagesCommandsRoutingModule } from './pages-commands-routing.module';
import { PagesCommandsComponent } from './pages-commands.component';

@NgModule({
  imports: [CommonModule, PagesCommandsRoutingModule, HeaderPrintModule, ResponsiveLayoutModule],
  declarations: [PagesCommandsComponent],
})
export class PagesCommandsModule {}
