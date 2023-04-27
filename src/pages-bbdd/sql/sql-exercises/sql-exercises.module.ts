import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SqlExercisesRoutingModule } from './sql-exercises-routing.module';
import { SqlExercisesComponent } from './sql-exercises.component';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';

@NgModule({
  imports: [CommonModule, SqlExercisesRoutingModule, HeaderPrintModule],
  declarations: [SqlExercisesComponent],
})
export class SqlExercisesModule {}
