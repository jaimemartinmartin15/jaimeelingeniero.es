import { NgModule } from '@angular/core';
import { ModalsContainerDirective } from './modals-container.directive';

@NgModule({
  declarations: [ModalsContainerDirective],
  exports: [ModalsContainerDirective],
})
export class ModalsModule {}
