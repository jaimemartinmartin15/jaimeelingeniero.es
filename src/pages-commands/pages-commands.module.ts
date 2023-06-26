import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesCommandsRoutingModule } from './pages-commands-routing.module';
import { PagesCommandsComponent } from './pages-commands.component';

@NgModule({
  imports: [CommonModule, PagesCommandsRoutingModule],
  declarations: [PagesCommandsComponent],
})
export class PagesCommandsModule {}
