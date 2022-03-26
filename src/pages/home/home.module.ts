import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TechnologiesSvgModule } from 'src/svg/generated/technologies-svg.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TechnologiesSvgModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
