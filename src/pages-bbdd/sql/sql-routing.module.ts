import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SqlComponent } from './sql.component';

const routes: Routes = [
  {
    path: '',
    component: SqlComponent,
    title: 'Lenguaje SQL',
    data: {
      metaTags: {
        description: 'Aprende el lenguaje SQL y su sintáxis con magníficos ejemplos y explicaciones.',
        keywords: ['sql', 'bases de datos', 'select', 'join', 'tablas'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '8 de abril de 2023',
      },
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SqlRoutingModule {}
