import { Directive, ViewContainerRef } from '@angular/core';
import { ModalsContainerService } from 'src/shared/services/modals-container.service';

/**
 * This directive gets a reference to the container where the
 * modals are created, and provides it to the service
 */

@Directive({
  selector: '[appModalsContainer]',
})
export class ModalsContainerDirective {
  constructor(readonly viewContainerRef: ViewContainerRef, readonly modalsContainerService: ModalsContainerService) {
    modalsContainerService.viewContainer = viewContainerRef;
  }
}
