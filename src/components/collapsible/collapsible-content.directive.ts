import { AfterContentInit, Directive, ElementRef, Optional } from '@angular/core';
import { CollapsibleComponent } from './collapsible.component';

@Directive({
  selector: '[appCollapsibleContent]',
})
export class CollapsibleContentDirective implements AfterContentInit {
  public constructor(private readonly elementRef: ElementRef, @Optional() collapsibleComponent: CollapsibleComponent) {
    if (collapsibleComponent === null) {
      throw new Error('appCollapsibleContent must be used inside <app-collapsible> component');
    }
  }

  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterContentInit(): void {
    this.element.style.transition = `height 0.5s`;
    this.element.style.height = `${this.element.clientHeight}px`;
  }

  public expand() {
    this.element.style.height = `${this.element.scrollHeight}px`;
    this.element.style.overflow = 'none';
  }

  public collapse() {
    this.element.style.height = '0px';
    this.element.style.overflow = 'hidden';
  }
}
