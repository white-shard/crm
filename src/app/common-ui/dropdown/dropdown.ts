import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { DropdownItem } from './types';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
  imports: [SvgIcon],
})
export class Dropdown {
  @Input({ required: true }) values: DropdownItem[] = [];
  @Input() position: 'left' | 'center' | 'right' = 'center';

  @Output() onSelect = new EventEmitter<string>();

  protected isOpened = signal<boolean>(false);

  private eRef: ElementRef;
  constructor(hostElement: ElementRef) {
    this.eRef = hostElement;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  protected select(value: string) {
    this.onSelect.emit(value);
    this.close();
  }

  public open() {
    this.isOpened.set(true);
  }

  public close() {
    this.isOpened.set(false);
  }

  public toggle() {
    this.isOpened.update((current) => !current);
  }

  public getIsOpened(): boolean {
    return this.isOpened();
  }
}
