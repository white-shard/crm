import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from '../../common-ui/dialog/dialog';
import { DialogCloseDirective } from '../../common-ui/dialog/directive/dialog-close.directive';
import { SvgIcon } from '../../common-ui/svg-icon/svg-icon';
import { injectCreateCorporationMutation } from '../../corporations/corporation.mutation';
import { injectAllUserCorporations } from '../../corporations/corporation.query';

@Component({
  selector: 'select-corp-widget',
  imports: [SvgIcon, Dialog, DialogCloseDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './select-corp.widget.html',
  styleUrl: './select-corp.widget.css',
})
export class SelectCorpWidget {
  allCorpQuery = injectAllUserCorporations();
  createCorpMutation = injectCreateCorporationMutation();

  hasDropdownOpened = signal<boolean>(false);
  // TODO Вынести функционал выбранной компании в сервис
  selectedCorp = signal<string | null>(null);

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      this.createCorpMutation.mutate({ ...this.form.value, publicKey: 'NO_KEY' });
    } else console.log('Form invalid');
  }
}
