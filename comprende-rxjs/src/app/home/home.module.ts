import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HomeRoutingModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
