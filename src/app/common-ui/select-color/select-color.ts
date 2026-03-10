import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  input,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'select-color',
  imports: [],
  templateUrl: './select-color.html',
  styleUrl: './select-color.css',
})
export class SelectColor {
  defaultValue = input.required<string>();
  selectedValue = signal<string | undefined>(undefined);
  currentValue = computed(() => this.selectedValue() ?? this.defaultValue());

  colors = input<string[]>(['ffffff', '000000', 'b2b2b2', 'c6c6c6', 'b2fca8']);
  isOpened = signal<boolean>(false);

  @Output() onSelect = new EventEmitter<string>();
  @Output() onClosed = new EventEmitter();

  selectColor(color: string) {
    this.selectedValue.set(color);
    this.onSelect.emit(color);
    this.closeForm();
  }

  @HostListener('keyup.escape', ['$event'])
  onKeyupEscape(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.closeForm();
  }

  toggleOpened() {
    if (this.isOpened()) this.closeForm();
    else this.isOpened.set(true);
  }

  closeForm() {
    this.onClosed.emit();
    this.isOpened.set(false);
  }
}
