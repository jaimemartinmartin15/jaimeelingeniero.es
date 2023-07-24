import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
})
export class CarouselModule {}
