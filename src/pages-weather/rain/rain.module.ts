import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RainDataResolver } from './rain-data.resolver';
import { RainRoutingModule } from './rain-routing.module';
import { RainComponent } from './rain.component';

@NgModule({
  imports: [CommonModule, RainRoutingModule, HttpClientModule],
  declarations: [RainComponent],
  providers: [RainDataResolver],
})
export class RainModule {}
