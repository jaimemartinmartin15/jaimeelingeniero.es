import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    title: 'Lista de comandos',
    data: {
      metaTags: {
        description: 'Aprende como usar comandos para escribir scripts de shell',
        keywords: ['bash', 'comandos', 'shell', 'terminal'],
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
export class MenuRoutingModule {}
