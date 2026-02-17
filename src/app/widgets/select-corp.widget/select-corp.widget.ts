import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from '../../common-ui/dialog/dialog';
import { DialogCloseDirective } from '../../common-ui/dialog/directive/dialog-close.directive';
import { SvgIcon } from '../../common-ui/svg-icon/svg-icon';
import { CorporationService } from '../../corporations/corporation.service';

@Component({
  selector: 'select-corp-widget',
  imports: [SvgIcon, Dialog, DialogCloseDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './select-corp.widget.html',
  styleUrl: './select-corp.widget.css',
})
export class SelectCorpWidget {
  corpService = inject(CorporationService);
  // TODO Загружать список компаний пользователя

  corpList$ = this.corpService.getAll();

  hasDropdownOpened = signal<boolean>(false);
  // TODO Вынести функционал выбранной компании в сервис
  selectedCorp = signal<string | null>(null);

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      this.corpService.create({ ...this.form.value, publicKey: 'NO_KEY' }).subscribe((res) => {
        console.log(res);
      });
    } else console.log('Form invalid');
  }
}
