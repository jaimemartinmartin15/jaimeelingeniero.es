import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapsibleCloseActionDirective } from './collapsible-close-action.directive';
import { CollapsibleContentDirective } from './collapsible-content.directive';
import { CollapsibleOpenActionDirective } from './collapsible-open-action.directive';
import { CollapsibleToggleActionDirective } from './collapsible-toggle-action.directive';
import { CollapsibleComponent } from './collapsible.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CollapsibleComponent,
    CollapsibleCloseActionDirective,
    CollapsibleContentDirective,
    CollapsibleOpenActionDirective,
    CollapsibleToggleActionDirective,
  ],
  exports: [
    CollapsibleComponent,
    CollapsibleCloseActionDirective,
    CollapsibleContentDirective,
    CollapsibleOpenActionDirective,
    CollapsibleToggleActionDirective,
  ],
})
export class CollapsibleModule {}
