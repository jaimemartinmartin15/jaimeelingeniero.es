import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeMapComponent } from './merge-map.component';
import { MergeMapRoutingModule } from './merge-map-routing.module';

@NgModule({
  imports: [CommonModule, MergeMapRoutingModule],
  declarations: [MergeMapComponent],
})
export class MergeMapModule {}
