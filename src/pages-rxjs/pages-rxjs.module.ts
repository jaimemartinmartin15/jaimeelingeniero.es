import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRxjsComponent } from './pages-rxjs.component';
import { PagesRxjsRoutingModule } from './pages-rxjs-routing.module';

@NgModule({
  imports: [CommonModule, PagesRxjsRoutingModule],
  declarations: [PagesRxjsComponent],
})
export class PagesRxjsModule {}
