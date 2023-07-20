import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeMenuRoutingModule } from './home-menu-routing.module';
import { HomeMenuComponent } from './home-menu.component';

@NgModule({
  imports: [CommonModule, HomeMenuRoutingModule, ReactiveFormsModule],
  declarations: [HomeMenuComponent],
})
export class HomeMenuModule {}
