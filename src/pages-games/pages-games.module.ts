import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { PagesGamesComponent } from './pages-games.component';

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule],
  declarations: [PagesGamesComponent],
})
export class PagesGamesModule {}
