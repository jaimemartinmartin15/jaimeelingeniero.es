import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResponsiveLayoutComponent } from './responsive-layout.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ResponsiveLayoutComponent],
  exports: [ResponsiveLayoutComponent]
})
export class ResponsiveLayoutModule {}
