import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IfComponent } from './if.component';

const routes: Routes = [
  {
    path: '',
    component: IfComponent,
    title: 'If',
    data: {
      metaTags: {
        description: 'Aprende a usar el condicional if y saca todo su potencial.',
        keywords: ['bash', 'comandos', 'if'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '17 de agosto de 2023',
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
export class IfRoutingModule {}
