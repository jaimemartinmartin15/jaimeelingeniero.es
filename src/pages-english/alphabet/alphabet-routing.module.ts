import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlphabetComponent } from './alphabet.component';

const routes: Routes = [
  {
    path: '',
    title: 'Alfabeto inglés',
    component: AlphabetComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlphabetRoutingModule {}
