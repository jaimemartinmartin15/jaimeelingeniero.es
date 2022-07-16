import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild([])],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
