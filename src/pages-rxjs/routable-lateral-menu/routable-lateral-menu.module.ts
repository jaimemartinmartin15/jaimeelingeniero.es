import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoutableLateralMenuRoutingModule } from './routable-lateral-menu-routing.module';
import { RoutableLateralMenuComponent } from './routable-lateral-menu.component';
import { RoutableLateralMenuResolver } from './routable-lateral-menu.resolver';

@NgModule({
  imports: [CommonModule, RoutableLateralMenuRoutingModule],
  declarations: [RoutableLateralMenuComponent],
  providers: [RoutableLateralMenuResolver],
})
export class RoutableLateralMenuModule {}
