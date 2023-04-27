import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SqlExercisesRoutingModule } from './sql-exercises-routing.module';
import { SqlExercisesComponent } from './sql-exercises.component';

@NgModule({
  imports: [CommonModule, SqlExercisesRoutingModule],
  declarations: [SqlExercisesComponent],
})
export class SqlExercisesModule {}
