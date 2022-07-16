import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrayectoryPanelModule } from 'src/components/trayectory-panel/trayectory-panel.module';

import { MyTrayectoryComponent } from './my-trayectory.component';
import { MyTrayectoryRoutingModule } from './my-trayectory-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyTrayectoryRoutingModule,
    TrayectoryPanelModule
  ],
  declarations: [MyTrayectoryComponent]
})
export class MyTrayectoryModule { }
