import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TechnologiesSvgModule } from 'src/svg/generated/technologies-svg.module';
import { ContactIconsSvgModule } from 'src/svg/generated/contact-icons-svg.module';
import { CarouselModule } from 'src/shared/components/carousel/carousel.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TechnologiesSvgModule, ContactIconsSvgModule, CarouselModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
