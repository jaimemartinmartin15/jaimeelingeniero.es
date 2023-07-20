import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageFullScreenComponent } from './image-full-screen.component';
import { ImageFullScreenDirective } from './image-full-screen.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageFullScreenDirective, ImageFullScreenComponent],
  exports: [ImageFullScreenDirective],
})
export class ImageFullScreenModule {}
