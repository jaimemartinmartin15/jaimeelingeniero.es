import { NgModule } from '@angular/core';
import { AlphabetModule } from './alphabet/alphabet.module';
import { PagesEnglishRoutingModule } from './pages-english-routing.module';

@NgModule({
  imports: [PagesEnglishRoutingModule, AlphabetModule],
})
export class PagesEnglishModule {}
