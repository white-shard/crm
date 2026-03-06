import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { SalesFunnelDto } from '@/models/sales-funnel/sales-funnel.dto';
import { Component, input } from '@angular/core';

@Component({
  selector: 'funnel-item',
  imports: [SvgIcon],
  templateUrl: './funnel-item.html',
  styleUrl: './funnel-item.css',
})
export class FunnelItem {
  data = input.required<SalesFunnelDto>();
}
