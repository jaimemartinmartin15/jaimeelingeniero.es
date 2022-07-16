import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTrayectoryComponent } from './my-trayectory.component';
import { MyTrayectoryRoutingModule } from './my-trayectory-routing.module';
import { TrayectoryPanelComponent } from './trayectory-panel/trayectory-panel.component';

@NgModule({
  imports: [CommonModule, MyTrayectoryRoutingModule],
  declarations: [MyTrayectoryComponent, TrayectoryPanelComponent],
})
export class MyTrayectoryModule {}
