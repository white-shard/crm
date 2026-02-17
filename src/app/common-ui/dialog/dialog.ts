import { Component, InjectionToken, Input, signal } from '@angular/core';

export const DIALOG_CLOSE = new InjectionToken<() => void>('DIALOG_CLOSE');

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  providers: [
    {
      provide: DIALOG_CLOSE,
      useFactory: (dialog: Dialog) => dialog.close.bind(dialog),
      deps: [Dialog],
    },
  ],
})
export class Dialog {
  isOpened = signal<boolean>(false);

  @Input() title: string = '';
  @Input() description: string = '';

  open() {
    this.isOpened.set(true);
  }

  close() {
    this.isOpened.set(false);
  }

  onDialogClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onBackgroundClick(event: MouseEvent) {
    event.stopPropagation();
    this.close();
  }
}
