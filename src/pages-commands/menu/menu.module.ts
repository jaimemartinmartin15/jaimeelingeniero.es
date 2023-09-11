import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [CommonModule, MenuRoutingModule],
  declarations: [MenuComponent],
})
export class MenuModule {}
