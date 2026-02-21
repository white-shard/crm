import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  standalone: true,
})
export class Dialog {
  isOpened = signal<boolean>(false);

  @Input() title: string = '';
  @Input() description: string = '';

  public open() {
    this.isOpened.set(true);
  }

  public openArrow() {
    return () => this.open();
  }

  public close() {
    this.isOpened.set(false);
  }

  public closeArrow() {
    return () => this.close();
  }

  public getIsOpened() {
    return this.isOpened();
  }

  protected onDialogClick(event: MouseEvent) {
    event.stopPropagation();
  }

  protected onBackgroundClick(event: MouseEvent) {
    event.stopPropagation();
    this.close();
  }
}
