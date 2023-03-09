import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlphabetRoutingModule } from './alphabet-routing.module';
import { AlphabetComponent } from './alphabet.component';

@NgModule({
  imports: [CommonModule, AlphabetRoutingModule],
  declarations: [AlphabetComponent],
})
export class AlphabetModule {}
