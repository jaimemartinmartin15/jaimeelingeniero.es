import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyTrayectoryRoutingModule } from './my-trayectory-routing.module';
import { MyTrayectoryComponent } from './my-trayectory.component';
import { TechnologiesSvgModule } from 'src/svg/generated/technologies-svg.module';

@NgModule({
  imports: [CommonModule, MyTrayectoryRoutingModule, TechnologiesSvgModule],
  declarations: [MyTrayectoryComponent],
})
export class MyTrayectoryModule {}
