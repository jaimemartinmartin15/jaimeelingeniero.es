import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderPrintModule } from 'src/components/header-print/header-print.module';
import { CollapsibleModule } from 'src/components/collapsible/collapsible.module';
import { TerminalCodeModule } from 'src/components/terminal-code/terminal-code.module';
import { SqlExercisesRoutingModule } from './sql-exercises-routing.module';
import { SqlExercisesComponent } from './sql-exercises.component';
import { ResponsiveLayoutModule } from 'src/components/responsive-layout/responsive-layout.module';

@NgModule({
  imports: [CommonModule, SqlExercisesRoutingModule, HeaderPrintModule, TerminalCodeModule, CollapsibleModule, ResponsiveLayoutModule],
  declarations: [SqlExercisesComponent],
})
export class SqlExercisesModule {}
