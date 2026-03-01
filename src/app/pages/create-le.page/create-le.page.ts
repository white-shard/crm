import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadLogo } from './ui/upload-logo/upload-logo';

@Component({
  selector: 'app-create-le.page',
  imports: [ReactiveFormsModule, UploadLogo],
  templateUrl: './create-le.page.html',
  styleUrl: './create-le.page.css',
})
export class CreateLegalEntityPage {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    shortName: [null, [Validators.required, Validators.maxLength(32)]],
    fullName: [null, [Validators.required, Validators.maxLength(128)]],
    inn: [null, [Validators.required, Validators.maxLength(10)]],
    address: [null, [Validators.required, Validators.maxLength(256)]],
    logo: [null],
  });
}
