import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalsModule } from 'src/shared/directives/modals-container/modals-container.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ModalsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
