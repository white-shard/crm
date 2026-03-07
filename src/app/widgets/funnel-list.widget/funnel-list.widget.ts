import { Loader } from '@/common-ui/loader/loader';
import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectSalesFunnel } from '@/models/sales-funnel/inject.dto';
import { SalesFunnelDto } from '@/models/sales-funnel/sales-funnel.dto';
import { Component, signal } from '@angular/core';
import { Form } from './ui/form/form';
import { FunnelItem } from './ui/funnel-item/funnel-item';

@Component({
  selector: 'funnel-list.widget',
  imports: [SvgIcon, FunnelItem, Form, Loader],
  templateUrl: './funnel-list.widget.html',
  styleUrl: './funnel-list.widget.css',
})
export class FunnelListWidget {
  current = signal<SalesFunnelDto | null>(null);

  funnelList = InjectSalesFunnel.query.findAll();

  isFormVisible = signal<boolean>(false);

  toggleForm() {
    if (this.current() !== null) this.current.set(null);
    this.isFormVisible.update((old) => !old);
  }

  setFormVisible(visible: boolean) {
    this.isFormVisible.set(visible);
  }

  setCurrent(item: SalesFunnelDto | null) {
    this.current.set(item);
    if (item) this.setFormVisible(true);
    else this.setFormVisible(false);
  }

  sortList(list: SalesFunnelDto[]) {
    return list.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }
}
