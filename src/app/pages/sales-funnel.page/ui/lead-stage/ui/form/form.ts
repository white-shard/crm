import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { InjectLeadStage } from '@/models/lead-stage/inject.dto';
import { LeadStageDto } from '@/models/lead-stage/lead-stage.dto';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'stage-form',
  imports: [SvgIcon, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class StageForm implements AfterViewInit {
  private funnelId;
  stage = input.required<LeadStageDto>();

  // Mutations
  public updateStage;

  @Output() hideForm = new EventEmitter<void>();

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  field = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(64),
  ]);

  constructor(private route: ActivatedRoute) {
    this.funnelId = this.route.snapshot.queryParamMap.get('id') ?? '';

    this.updateStage = InjectLeadStage.mutation.update(this.funnelId);
  }

  ngAfterViewInit() {
    this.focus();
    this.field.setValue(this.stage().displayName);
  }

  focus() {
    this.input.nativeElement.focus();
  }

  closeForm(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.field.reset();
    this.hideForm.emit();
  }

  onSave() {
    this.hideForm.emit();
    this.updateStage.mutate({
      id: this.stage().id,
      displayName: String(this.field.getRawValue()),
    });
  }
}
