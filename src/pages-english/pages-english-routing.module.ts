import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlphabetComponent } from './alphabet/alphabet.component';

const routes: Routes = [
  {
    path: 'alfabeto',
    title: 'Alfabeto inglés',
    component: AlphabetComponent,
  },
  {
    path: '**',
    redirectTo: 'alfabeto',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesEnglishRoutingModule {}
