import { AfterContentInit, Directive, ElementRef, Optional } from '@angular/core';
import { CollapsibleComponent } from './collapsible.component';

@Directive({
  selector: '[appCollapsibleContent]',
})
export class CollapsibleContentDirective implements AfterContentInit {
  public constructor(private readonly elementRef: ElementRef, @Optional() private readonly collapsibleComponent: CollapsibleComponent) {
    if (collapsibleComponent === null) {
      throw new Error('appCollapsibleContent must be used inside <app-collapsible> component');
    }
  }

  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterContentInit(): void {
    setTimeout(() => {
      // in case it should appear initially closed,
      // wait to add the transition (the component will call collapse before the timeout executes)
      this.element.style.transition = `height 0.5s`;
      this.element.style.height = `${this.element.clientHeight}px`;
    }, 0);

    const mutationObs = new MutationObserver(() => {
      if (this.collapsibleComponent.isOpen) {
        // the browser will calculate the height and adapt it. Restore to absolute to animate again when closing
        this.element.style.height = 'auto';
        setTimeout(() => (this.element.style.height = `${this.element.scrollHeight}px`), 0);
      }
    });
    mutationObs.observe(this.element, { childList: true });
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
