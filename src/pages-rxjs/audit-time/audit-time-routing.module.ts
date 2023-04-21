import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditTimeComponent } from './audit-time.component';

const routes: Routes = [
  {
    path: '',
    component: AuditTimeComponent,
    title: 'AuditTime rxjs',
    data: {
      metaTags: {
        description:
          'Espera a que se emita un elemento en el Observable fuente. A continuación inicia un temporizador, y cuando termina, emite el último elemento que haya pasado en el Observable fuente. A continuación espera el siguiente elemento y repite el proceso.',
        keywords: ['audittime', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '10 de junio de 2022',
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
export class AuditTimeRoutingModule {}
