import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyTrayectoryRoutingModule } from './my-trayectory-routing.module';
import { MyTrayectoryComponent } from './my-trayectory.component';

@NgModule({
  imports: [CommonModule, MyTrayectoryRoutingModule],
  declarations: [MyTrayectoryComponent],
})
export class MyTrayectoryModule {}
