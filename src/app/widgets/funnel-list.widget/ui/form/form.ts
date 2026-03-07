import { Loader } from '@/common-ui/loader/loader';
import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectSalesFunnel } from '@/models/sales-funnel/inject.dto';
import { SalesFunnelDto } from '@/models/sales-funnel/sales-funnel.dto';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'funnel-form',
  imports: [SvgIcon, Loader, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements AfterViewInit {
  current = input<SalesFunnelDto | null>();

  @Output() changeFormVisible = new EventEmitter<boolean>();
  @Output() clearSelectedForUpdate = new EventEmitter<void>();

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  // Mutation
  createFunnel = InjectSalesFunnel.mutation.create();
  updateFunnel = InjectSalesFunnel.mutation.update();

  field = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(64),
  ]);

  onSubmit() {
    if (this.field.valid) {
      const data = { displayName: this.field.value ?? '' };
      this.changeFormVisible.emit(false);

      if (this.hasEdit) {
        this.updateFunnel
          .mutateAsync({ ...this.current()!, ...data })
          .then(() => this.onCancel())
          .catch(() => {
            this.changeFormVisible.emit(true);
          });
      } else {
        this.createFunnel
          .mutateAsync(data)
          .then(() => this.onCancel())
          .catch(() => {
            this.changeFormVisible.emit(true);
          });
      }
    }
  }

  onCancel() {
    this.field.reset();
    this.clearSelectedForUpdate.emit();
    this.changeFormVisible.emit(false);
  }

  focus() {
    this.input.nativeElement.focus();
  }

  get hasEdit() {
    return this.current() !== null;
  }

  get hasPending() {
    return this.createFunnel.isPending();
  }

  ngAfterViewInit() {
    this.focus();
    this.field.setValue(this.current()?.displayName ?? '');
  }
}
