import { Directive, ElementRef } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { ModalsContainerService } from 'src/shared/services/modals-container.service';
import { ImageFullScreenComponent } from './image-full-screen.component';

@Directive({
  selector: '[appImageFullScreen]',
})
export class ImageFullScreenDirective {
  public constructor(private readonly elementRef: ElementRef, private readonly modalsContainer: ModalsContainerService) {
    fromEvent(this.image, 'click')
      .pipe(filter(() => window.matchMedia('(max-width: 1200px)').matches))
      .subscribe(() => this.openImageFullScreen());
  }

  private get image(): HTMLImageElement {
    return this.elementRef.nativeElement;
  }

  private openImageFullScreen() {
    this.modalsContainer.viewContainer.createComponent(ImageFullScreenComponent, { projectableNodes: [[this.image.cloneNode()]] });
  }
}
