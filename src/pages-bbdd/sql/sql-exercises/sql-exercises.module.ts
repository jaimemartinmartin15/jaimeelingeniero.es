import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';
import { CollapsibleModule } from 'src/shared/components/collapsible/collapsible.module';
import { TerminalCodeModule } from 'src/shared/components/terminal-code/terminal-code.module';
import { SqlExercisesRoutingModule } from './sql-exercises-routing.module';
import { SqlExercisesComponent } from './sql-exercises.component';

@NgModule({
  imports: [CommonModule, SqlExercisesRoutingModule, HeaderPrintModule, TerminalCodeModule, CollapsibleModule],
  declarations: [SqlExercisesComponent],
})
export class SqlExercisesModule {}
