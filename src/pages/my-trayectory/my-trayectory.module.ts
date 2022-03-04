import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTrayectoryComponent } from './my-trayectory.component';
import { MyTrayectoryRoutingModule } from './my-trayectory-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyTrayectoryRoutingModule
  ],
  declarations: [MyTrayectoryComponent]
})
export class MyTrayectoryModule { }
