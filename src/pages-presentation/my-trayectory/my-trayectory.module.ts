import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyTrayectoryRoutingModule } from './my-trayectory-routing.module';
import { MyTrayectoryComponent } from './my-trayectory.component';
import { TechnologiesSvgModule } from 'src/svg/generated/technologies-svg.module';
import { BulletsComponent } from './bullets/bullets.component';

@NgModule({
  imports: [CommonModule, MyTrayectoryRoutingModule, TechnologiesSvgModule],
  declarations: [MyTrayectoryComponent, BulletsComponent],
})
export class MyTrayectoryModule {}
