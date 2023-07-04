import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';
import { PagesCommandsRoutingModule } from './pages-commands-routing.module';
import { PagesCommandsComponent } from './pages-commands.component';

@NgModule({
  imports: [CommonModule, PagesCommandsRoutingModule, HeaderPrintModule],
  declarations: [PagesCommandsComponent],
})
export class PagesCommandsModule {}
