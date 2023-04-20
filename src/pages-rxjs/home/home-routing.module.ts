import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Índice operadores rxjs',
    data: {
      metaTags: {
        description: 'Aprende los operadores Rxjs con facilidad al usar la demo interactiva que se proporciona para cada uno de ellos.',
        keywords: ['operadores rxjs', 'lista', 'demo interactiva'],
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
export class HomeRoutingModule {}
