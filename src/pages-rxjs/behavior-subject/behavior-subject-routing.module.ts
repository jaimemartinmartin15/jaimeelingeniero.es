import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BehaviorSubjectComponent } from './behavior-subject.component';

const routes: Routes = [
  {
    path: '',
    component: BehaviorSubjectComponent,
    title: 'BehaviorSubject rxjs',
    data: {
      metaTags: {
        description: 'Subject que guarda el último elemento emitido y lo emite a los nuevos suscriptores cuando se suscriben.',
        keywords: ['behaviorsubject', 'demo', 'rxjs'],
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
export class BehaviorSubjectRoutingModule {}
