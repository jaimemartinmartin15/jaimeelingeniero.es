import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsPageComponent } from './rxjs-page.component';
import { RxjsPageRoutingModule } from './rxjs-page-routing.module';

@NgModule({
  imports: [CommonModule, RxjsPageRoutingModule],
  declarations: [RxjsPageComponent],
})
export class PagesRxjsModule {}
