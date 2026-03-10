import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectLeadStage } from '@/models/lead-stage/inject.dto';
import { LeadStageDto } from '@/models/lead-stage/lead-stage.dto';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadStage } from './ui/lead-stage/lead-stage';
import { StageColors } from './ui/lead-stage/lead-stage.colors';

@Component({
  selector: 'app-sales-funnel.page',
  imports: [LeadStage, SvgIcon, DragDropModule],
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
    this.updateStage = InjectLeadStage.mutation.update(this.funnelId);
  }

  public editingStageId = signal<string | null>(null);

  public funnelId;
  public stages;

  // Mutations
  public createStage;
  public updateStage;

  public sortStages(stages: LeadStageDto[]) {
    return stages.sort((a, b) => {
      const indexDiff = a.index - b.index;
      if (indexDiff !== 0) return indexDiff;

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }

  public dropped(event: CdkDragDrop<LeadStageDto>) {
    const { previousIndex, currentIndex, item } = event;

    if (previousIndex === currentIndex) return;

    this.updateStage.mutate({ id: item.data, index: currentIndex });
  }

  public createNewStage() {
    if (this.createStage.isPending()) return;
    const index = this.stages.data()?.length ?? 0;

    this.createStage.mutate({
      displayName: `Новая колонка ${index}`,
      color: StageColors[0] ?? 'ffffff',
      funnelId: this.funnelId,
      index,
    });
  }
}
