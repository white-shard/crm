import { CreateLegalEntityDto } from '@/models/legal-entity/legal-entity.dto';
import { LegalEntityService } from '@/models/legal-entity/legal-entity.service';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
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
      const values = this.form.getRawValue() as unknown as CreateLegalEntityDto;

      this.entityService
        .create(values)
        .pipe(
          switchMap((entity) => {
            if (this.logoUploader.logo) {
              return this.entityService.updateLogo(entity.id, this.logoUploader.logo);
            }
            return of(null);
          }),
          tap(() => this.router.navigate(['/dashboard'])),
          catchError((err) => {
            this.errorMessage.set(err.error?.message ?? 'Unknown error');
            this.router.navigate(['/dashboard']);
            return of(null);
          }),
        )
        .subscribe();
    }
  }
}
