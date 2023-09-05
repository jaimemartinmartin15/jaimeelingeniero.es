import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CollapsibleModule } from 'src/shared/components/collapsible/collapsible.module';
import { DataFileSelectorComponent } from './components/data-file-selector/data-file-selector.component';
import { DaysGraphicComponent } from './components/days-graphic/days-graphic.component';
import { RainDataResolver } from './rain-data.resolver';
import { RainRoutingModule } from './rain-routing.module';
import { RainComponent } from './rain.component';

@NgModule({
  imports: [CommonModule, RainRoutingModule, HttpClientModule, CollapsibleModule],
  declarations: [RainComponent, DataFileSelectorComponent, DaysGraphicComponent],
  providers: [RainDataResolver],
})
export class RainModule {}
