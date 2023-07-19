import { AfterViewInit, Directive, ElementRef, Optional } from '@angular/core';
import { Observable, fromEvent, tap } from 'rxjs';
import { CollapsibleComponent } from './collapsible.component';

@Directive({
  selector: '[appCollapsibleCloseAction]',
})
export class CollapsibleCloseActionDirective implements AfterViewInit {
  private display: string;

  private _closeAction$: Observable<Event>;
  public get closeAction$(): Observable<Event> {
    return this._closeAction$;
  }

  public constructor(private readonly elementRef: ElementRef, @Optional() collapsibleComponent: CollapsibleComponent) {
    if (collapsibleComponent === null) {
      throw new Error('appCollapsibleCloseAction must be used inside <app-collapsible> component');
    }
  }

  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    this.display = this.element.style.display;
    this.element.style.cursor = 'pointer';

    this._closeAction$ = fromEvent(this.element, 'click').pipe(tap(() => (this.element.style.display = 'none')));
  }

  public showAction() {
    this.element.style.display = this.display;
  }

  public hideAction() {
    this.element.style.display = 'none';
  }
}
