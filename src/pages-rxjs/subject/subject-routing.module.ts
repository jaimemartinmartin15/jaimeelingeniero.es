import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './subject.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectComponent,
    title: 'Subject rxjs',
    data: {
      metaTags: {
        description: 'Tipo de Observable que a su vez es observador. Sí, los elementos que emite los recibe él mismo.',
        keywords: ['subject', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '18 de julio de 2022',
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
export class SubjectRoutingModule {}
