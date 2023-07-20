import { Injectable, ViewContainerRef } from '@angular/core';

/**
 * Provides the ViewContainerRef for modals
 */
@Injectable({
  providedIn: 'root',
})
export class ModalsContainerService {
  private _viewContainer: ViewContainerRef;

  public set viewContainer(container: ViewContainerRef) {
    if (this._viewContainer) {
      throw new Error('There is already a ViewContainerRef for the ModalsContainerService. Did you create two [appModalsContainer] elements?');
    }
    this._viewContainer = container;
  }

  public get viewContainer() {
    if (!this._viewContainer) {
      throw new Error('There is no ViewContainerRef for the ModalsContainerService. Do you have a [appModalsContainer] element?');
    }
    return this._viewContainer;
  }
}
