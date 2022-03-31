import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavigationSvgModule } from 'src/svg/generated/top-navigation-svg.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';

@NgModule({
  declarations: [AppComponent, TopNavigationComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, TopNavigationSvgModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
