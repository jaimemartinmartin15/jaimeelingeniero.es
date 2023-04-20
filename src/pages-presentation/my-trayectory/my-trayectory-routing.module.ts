import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyTrayectoryComponent } from './my-trayectory.component';

const routes: Routes = [
  {
    path: '',
    component: MyTrayectoryComponent,
    title: 'Trayectoria',
    data: {
      metaTags: {
        description: 'Conoce cual ha sido mi trayectoria profesional hasta el día de hoy y en que proyectos he trabajado.',
        keywords: ['jaime martin martin', 'curriculum', 'trayectoria'],
      },
    },
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTrayectoryRoutingModule {}
