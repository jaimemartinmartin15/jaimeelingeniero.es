import { AfterViewInit, Directive, ElementRef, Optional } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { CollapsibleComponent } from './collapsible.component';

@Directive({
  selector: '[appCollapsibleToggleAction]',
})
export class CollapsibleToggleActionDirective implements AfterViewInit {
  private _toggleAction$: Observable<Event>;
  public get toggleAction$(): Observable<Event> {
    return this._toggleAction$;
  }

  public constructor(private readonly elementRef: ElementRef, @Optional() collapsibleComponent: CollapsibleComponent) {
    if (collapsibleComponent === null) {
      throw new Error('appCollapsibleToggleAction must be used inside <app-collapsible> component');
    }
  }

  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    this._toggleAction$ = fromEvent(this.element, 'click');
    this.element.style.cursor = 'pointer';
  }
}
