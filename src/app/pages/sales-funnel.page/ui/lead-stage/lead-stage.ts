import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectLeadStage } from '@/models/lead-stage/inject.dto';
import { LeadStageDto } from '@/models/lead-stage/lead-stage.dto';
import { Component, EventEmitter, input, Output } from '@angular/core';
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
  stageCount = input<number>(0);
  isEditing = input<boolean>(false);

  @Output() onStartEdit = new EventEmitter<string>();
  @Output() onStopEdit = new EventEmitter<string>();

  private funnelId;

  // Mutation
  private removeStage;
  private updateStage;

  constructor(private route: ActivatedRoute) {
    this.funnelId = this.route.snapshot.queryParamMap.get('id') ?? '';

    this.removeStage = InjectLeadStage.mutation.remove(this.funnelId);
    this.updateStage = InjectLeadStage.mutation.update(this.funnelId);
  }

  calculateTestColor(color: string) {
    const res = getReadableTextColor(color);
    return `var(--color-${res})`;
  }

  startEdit() {
    this.onStartEdit.emit(this.stage().id);
  }

  stopEdit() {
    this.onStopEdit.emit(this.stage().id);
  }

  remove() {
    if (this.removeStage.isPending()) return;
    this.removeStage.mutate(this.stage().id);
  }

  moveLeft() {
    if (this.updateStage.isPending() || this.removeStage.isPending()) return;
    if (this.stage().index > 0) {
      this.updateStage.mutate({
        id: this.stage().id,
        index: this.stage().index - 1,
      });
    }
  }

  moveRight() {
    if (this.updateStage.isPending() || this.removeStage.isPending()) return;
    if (this.stage().index < this.stageCount() - 1) {
      this.updateStage.mutate({
        id: this.stage().id,
        index: this.stage().index + 1,
      });
    }
  }
}
