import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTrayectoryComponent } from './my-trayectory.component';
import { MyTrayectoryRoutingModule } from './my-trayectory-routing.module';
import { TrayectoryPanelModule } from './trayectory-panel/trayectory-panel.module';

@NgModule({
  imports: [CommonModule, MyTrayectoryRoutingModule, TrayectoryPanelModule],
  declarations: [MyTrayectoryComponent],
})
export class MyTrayectoryModule {}
