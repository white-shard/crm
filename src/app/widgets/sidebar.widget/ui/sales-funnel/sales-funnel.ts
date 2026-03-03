import { Loader } from '@/common-ui/loader/loader';
import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { SalesFunnelDto } from '@/models/sales-funnel/sales-funnel.dto';
import {
  injectCreateSalesFunnelMutation,
  injectRemoveSalesFunnelMutation,
  injectUpdateSalesFunnelMutation,
} from '@/models/sales-funnel/sales-funnel.mutation';
import { injectFindAllSalesFunnel } from '@/models/sales-funnel/sales-funnel.query';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-funnel',
  imports: [SvgIcon, ReactiveFormsModule, Loader],
  templateUrl: './sales-funnel.html',
  styleUrl: './sales-funnel.css',
})
export class SalesFunnel {
  funnelList = injectFindAllSalesFunnel();
  router = inject(Router);

  createFunnel = injectCreateSalesFunnelMutation();
  updateFunnel = injectUpdateSalesFunnelMutation();
  removeFunnel = injectRemoveSalesFunnelMutation();

  current = signal<SalesFunnelDto | null>(null);
  isEnabled = signal<boolean>(false);

  field = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(64),
  ]);

  onSave() {
    if (this.field.valid) {
      if (!!this.current()) {
        const data = { displayName: String(this.field.value) };
        this.updateFunnel.mutateAsync({ id: this.current()?.id!, data }).then(() => {
          this.current.set(null);
          this.hideForm();
        });
      } else {
        this.createFunnel.mutateAsync({ displayName: String(this.field.value) }).then(() => {
          this.hideForm();
        });
      }
    }
  }

  updateForm(funnel: SalesFunnelDto) {
    this.current.set(funnel);
    this.field.setValue(funnel.displayName);
    this.showForm();
  }

  showForm() {
    this.isEnabled.set(true);
  }

  hideForm() {
    this.field.reset();
    this.isEnabled.set(false);
  }

  deleteSalesFunnel(id: string) {
    this.removeFunnel.mutate(id);
  }

  goToFunnel(id: string) {
    this.router.navigate(['funnel'], {
      queryParams: {
        id,
      },
    });
  }
}
