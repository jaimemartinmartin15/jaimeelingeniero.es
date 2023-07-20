import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderPrintComponent } from './header-print.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderPrintComponent],
  exports: [HeaderPrintComponent],
})
export class HeaderPrintModule {}
