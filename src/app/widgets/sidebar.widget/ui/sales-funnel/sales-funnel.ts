import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { SalesFunnelDto } from '@/models/sales-funnel/sales-funnel.dto';
import { injectFindAllSalesFunnel } from '@/models/sales-funnel/sales-funnel.query';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-funnel',
  imports: [SvgIcon, ReactiveFormsModule],
  templateUrl: './sales-funnel.html',
  styleUrl: './sales-funnel.css',
})
export class SalesFunnel {
  funnelList = injectFindAllSalesFunnel();
  router = inject(Router);

  current = signal<SalesFunnelDto | null>(null);
  isEnabled = signal<boolean>(false);

  field = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(64),
  ]);

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

  goToFunnel(id: string) {
    this.router.navigate(['funnel'], {
      queryParams: {
        id,
      },
    });
  }
}
