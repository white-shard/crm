import { Directive, HostListener, inject } from '@angular/core';
import { DIALOG_CLOSE } from '../dialog';

@Directive({
  selector: '[dialogClose]',
  standalone: true,
})
export class DialogCloseDirective {
  private close = inject(DIALOG_CLOSE);

  @HostListener('click')
  onClick() {
    this.close();
  }
}
