import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectSalesFunnel } from '@/models/sales-funnel/inject.dto';
import { SalesFunnelDto } from '@/models/sales-funnel/sales-funnel.dto';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'funnel-item',
  imports: [SvgIcon],
  templateUrl: './funnel-item.html',
  styleUrl: './funnel-item.css',
})
export class FunnelItem {
  data = input.required<SalesFunnelDto>();

  @Output() onSelectedForUpdate = new EventEmitter<SalesFunnelDto | null>();

  router = inject(Router);

  // Mutations
  removeFunnel = InjectSalesFunnel.mutation.remove();

  selectForUpdate(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.onSelectedForUpdate.emit(this.data());
  }

  remove(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.removeFunnel.mutate(this.data().id);
  }

  goToTheFunnelPage() {
    this.router.navigate(['funnel'], {
      queryParams: {
        id: this.data().id,
      },
    });
  }
}
