import { CreateLegalEntityDto } from '@/models/legal-entity/legal-entity.dto';
import { LegalEntityService } from '@/models/legal-entity/legal-entity.service';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadLogo } from './ui/upload-logo/upload-logo';

@Component({
  selector: 'app-create-le.page',
  imports: [ReactiveFormsModule, UploadLogo],
  templateUrl: './create-le.page.html',
  styleUrl: './create-le.page.css',
})
export class CreateLegalEntityPage {
  @ViewChild(UploadLogo) logoUploader!: UploadLogo;

  entityService = inject(LegalEntityService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  errorMessage = signal<string | undefined>(undefined);

  form = this.formBuilder.group({
    shortName: [null, [Validators.required, Validators.maxLength(32)]],
    fullName: [null, [Validators.required, Validators.maxLength(128)]],
    inn: [null, [Validators.required, Validators.maxLength(10)]],
    address: [null, [Validators.required, Validators.maxLength(256)]],
  });

  onSave() {
    this.errorMessage.set(undefined);

    if (this.form.valid) {
      const values = this.form.value as unknown as CreateLegalEntityDto;
      this.entityService.create(values).subscribe({
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
        next: (value) => {
          if (this.logoUploader.logo !== null) {
            this.entityService.updateLogo(value.id, this.logoUploader.logo).subscribe({
              complete: () => {
                this.router.navigate(['/dashboard']);
              },
              error: (err) => {
                this.errorMessage.set(err.error.message);
              },
            });
          }
        },
        complete: () => {
          if (this.logoUploader.logo === null) {
            this.router.navigate(['/dashboard']);
          }
        },
      });
    }
  }
}
