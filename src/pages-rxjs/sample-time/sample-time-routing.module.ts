import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleTimeComponent } from './sample-time.component';

const routes: Routes = [
  {
    path: '',
    component: SampleTimeComponent,
    title: 'SampleTime rxjs',
    data: {
      metaTags: {
        description:
          'Mira cada cierto tiempo el Observable fuente y emite el último elemento que se se haya emitido hasta ese momento desde la última vez que miró.',
        keywords: ['sampletime', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '3 de junio de 2022',
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
export class SampleTimeRoutingModule {}
