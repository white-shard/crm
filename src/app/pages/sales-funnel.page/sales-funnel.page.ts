import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectLeadStage } from '@/models/lead-stage/inject.dto';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadStage } from './ui/lead-stage/lead-stage';

@Component({
  selector: 'app-sales-funnel.page',
  imports: [LeadStage, SvgIcon],
  templateUrl: './sales-funnel.page.html',
  styleUrl: './sales-funnel.page.css',
})
export class SalesFunnelPage {
  constructor(private route: ActivatedRoute) {
    this.funnelId = this.route.snapshot.queryParamMap.get('id') ?? '';

    if (!this.funnelId.length) {
      inject(Router).navigate(['/dashboard']);
    }

    this.stages = InjectLeadStage.query.findAll(this.funnelId);
    this.createStage = InjectLeadStage.mutation.create(this.funnelId);
  }

  public editedStageId = signal<string | null>(null);

  public funnelId;
  public stages;

  // Mutations
  public createStage;

  public createNewStage() {
    if (this.createStage.isPending()) return;
    const index = this.stages.data()?.length ?? 0;

    this.createStage.mutate({
      displayName: `Новая колонка ${index}`,
      color: '000000',
      funnelId: this.funnelId,
      index,
    });
  }
}
