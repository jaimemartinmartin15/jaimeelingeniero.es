import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SqlExercisesComponent } from './sql-exercises.component';

const routes: Routes = [
  {
    path: '',
    component: SqlExercisesComponent,
    title: 'Ejercicios SQL',
    data: {
      metaTags: {
        description: 'Practica con esta lista de enunciados consultas SQL a la base de datos',
        keywords: ['sql', 'ejercicios', 'consultas'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '11 de junio de 2023',
      },
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SqlExercisesRoutingModule {}
