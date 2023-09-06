import { AfterViewInit, Component, ContentChild, ContentChildren, Input, QueryList } from '@angular/core';
import { merge } from 'rxjs';
import { CollapsibleCloseActionDirective } from './collapsible-close-action.directive';
import { CollapsibleContentDirective } from './collapsible-content.directive';
import { CollapsibleOpenActionDirective } from './collapsible-open-action.directive';
import { CollapsibleToggleActionDirective } from './collapsible-toggle-action.directive';

@Component({
  selector: 'app-collapsible',
  template: '<ng-content></ng-content>',
  styles: [':host {display: block;}'],
})
export class CollapsibleComponent implements AfterViewInit {
  @ContentChildren(CollapsibleCloseActionDirective)
  private collapsibleCloseActions: QueryList<CollapsibleCloseActionDirective>;

  @ContentChild(CollapsibleContentDirective)
  private collapsibleContent: CollapsibleContentDirective;

  @ContentChildren(CollapsibleOpenActionDirective)
  private collapsibleOpenActions: QueryList<CollapsibleOpenActionDirective>;

  @ContentChildren(CollapsibleToggleActionDirective)
  private collapsibleToggleActions: QueryList<CollapsibleToggleActionDirective>;

  @Input()
  public isOpen = false;

  public ngAfterViewInit(): void {
    merge(...this.collapsibleOpenActions.map((c) => c.openAction$)).subscribe(() => this.onClickOpenAction());
    merge(...this.collapsibleCloseActions.map((c) => c.closeAction$)).subscribe(() => this.onClickCloseAction());
    merge(...this.collapsibleToggleActions.map((c) => c.toggleAction$)).subscribe(() => this.onClickToggleAction());

    this.isOpen
      ? (this.collapsibleCloseActions.forEach((c) => c.showAction()), this.collapsibleOpenActions.forEach((c) => c.hideAction()))
      : (this.collapsibleOpenActions.forEach((c) => c.showAction()),
        this.collapsibleCloseActions.forEach((c) => c.hideAction()),
        this.collapsibleContent.collapse());
  }

  public onClickToggleAction(): void {
    this.isOpen ? this.onClickCloseAction() : this.onClickOpenAction();
  }

  public onClickOpenAction(): void {
    this.isOpen = true;
    this.collapsibleContent.expand();
    this.collapsibleCloseActions.forEach((c) => c.showAction());
    this.collapsibleOpenActions.forEach((c) => c.hideAction());
  }

  public onClickCloseAction(): void {
    this.isOpen = false;
    this.collapsibleContent.collapse();
    this.collapsibleOpenActions.forEach((c) => c.showAction());
    this.collapsibleCloseActions.forEach((c) => c.hideAction());
  }
}
