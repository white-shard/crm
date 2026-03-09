import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectLeadStage } from '@/models/lead-stage/inject.dto';
import { LeadStageDto } from '@/models/lead-stage/lead-stage.dto';
import { Component, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getReadableTextColor } from 'utils';
import { StageForm } from './ui/form/form';

@Component({
  selector: 'app-lead-stage',
  imports: [SvgIcon, StageForm],
  templateUrl: './lead-stage.html',
  styleUrl: './lead-stage.css',
})
export class LeadStage {
  stage = input.required<LeadStageDto>();
  hasEdit = signal<boolean>(false);

  private funnelId;

  // Mutation
  private removeStage;

  constructor(private route: ActivatedRoute) {
    this.funnelId = this.route.snapshot.queryParamMap.get('id') ?? '';

    this.removeStage = InjectLeadStage.mutation.remove(this.funnelId);
  }

  calculateTestColor(color: string) {
    const res = getReadableTextColor(color);
    return `var(--color-${res})`;
  }

  remove() {
    if (this.removeStage.isPending()) return;
    this.removeStage.mutate(this.stage().id);
  }
}
