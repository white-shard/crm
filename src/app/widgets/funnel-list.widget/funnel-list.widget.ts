import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectSalesFunnel } from '@/models/sales-funnel/inject.dto';
import { Component, signal } from '@angular/core';
import { Form } from './ui/form/form';
import { FunnelItem } from './ui/funnel-item/funnel-item';

@Component({
  selector: 'funnel-list.widget',
  imports: [SvgIcon, FunnelItem, Form],
  templateUrl: './funnel-list.widget.html',
  styleUrl: './funnel-list.widget.css',
})
export class FunnelListWidget {
  funnelList = InjectSalesFunnel.query.findAll();

  isFormVisible = signal<boolean>(false);

  toggleForm() {
    this.isFormVisible.update((old) => !old);
  }

  setFormVisible(visible: boolean) {
    this.isFormVisible.set(visible);
  }
}
