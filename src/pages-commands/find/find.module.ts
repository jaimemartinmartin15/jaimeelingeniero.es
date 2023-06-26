import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FindRoutingModule } from './find-routing.module';
import { FindComponent } from './find.component';

@NgModule({
  imports: [CommonModule, FindRoutingModule],
  declarations: [FindComponent],
})
export class FindModule {}
