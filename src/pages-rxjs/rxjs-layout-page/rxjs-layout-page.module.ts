import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';
import { RxjsLayoutPageRoutingModule } from './rxjs-layout-page-routing.module';
import { RxjsLayoutPageComponent } from './rxjs-layout-page.component';
import { RxjsLayoutPageResolver } from './rxjs-layout-page.resolver';

@NgModule({
  imports: [CommonModule, RxjsLayoutPageRoutingModule, HeaderPrintModule],
  declarations: [RxjsLayoutPageComponent],
  providers: [RxjsLayoutPageResolver],
})
export class RxjsLayoutPageModule {}
