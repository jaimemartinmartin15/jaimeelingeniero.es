import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderPrintModule } from 'src/shared/components/header-print/header-print.module';
import { ResponsiveLayoutModule } from 'src/shared/components/responsive-layout/responsive-layout.module';
import { RxjsLayoutPageRoutingModule } from './rxjs-layout-page-routing.module';
import { RxjsLayoutPageComponent } from './rxjs-layout-page.component';
import { RxjsLayoutPageResolver } from './rxjs-layout-page.resolver';

@NgModule({
  imports: [CommonModule, RxjsLayoutPageRoutingModule, HeaderPrintModule, ResponsiveLayoutModule],
  declarations: [RxjsLayoutPageComponent],
  providers: [RxjsLayoutPageResolver],
})
export class RxjsLayoutPageModule {}
