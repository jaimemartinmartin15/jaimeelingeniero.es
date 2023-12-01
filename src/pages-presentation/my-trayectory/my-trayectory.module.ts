import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactIconsSvgModule } from 'src/svg/generated/contact-icons-svg.module';
import { TechnologiesSvgModule } from 'src/svg/generated/technologies-svg.module';
import { BulletsComponent } from './bullets/bullets.component';
import { MyTrayectoryRoutingModule } from './my-trayectory-routing.module';
import { MyTrayectoryComponent } from './my-trayectory.component';

@NgModule({
  imports: [CommonModule, MyTrayectoryRoutingModule, TechnologiesSvgModule, ContactIconsSvgModule],
  declarations: [MyTrayectoryComponent, BulletsComponent],
})
export class MyTrayectoryModule {}
