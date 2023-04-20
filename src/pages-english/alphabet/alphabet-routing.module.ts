import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlphabetComponent } from './alphabet.component';

const routes: Routes = [
  {
    path: '',
    component: AlphabetComponent,
    title: 'Alfabeto inglés',
    data: {
      metaTags: {
        description: 'Aprende a pronunciar las letras del alfabeto inglés en español.',
        keywords: ['pronunciacion', 'alfabeto', 'ingles'],
      },
    },
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
