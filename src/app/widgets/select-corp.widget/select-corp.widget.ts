import { Dialog } from '@/common-ui/dialog/dialog';
import { Loader } from '@/common-ui/loader/loader';
import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { injectCreateCorporationMutation } from '@/models/corporations/corporation.mutation';
import { injectAllUserCorporations } from '@/models/corporations/corporation.query';
import { CorporationResponseDTO } from '@/models/corporations/dto/create.dto';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'select-corp-widget',
  imports: [SvgIcon, Dialog, CommonModule, ReactiveFormsModule, Loader],
  templateUrl: './select-corp.widget.html',
  styleUrl: './select-corp.widget.css',
})
export class SelectCorpWidget {
  allCorpQuery = injectAllUserCorporations();
  createCorpMutation = injectCreateCorporationMutation();

  hasDropdownOpened = signal<boolean>(false);
  // TODO Вынести функционал выбранной компании в сервис
  selectedCorpId = signal<string | null>(null);

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  onSubmit(callback?: () => unknown) {
    if (this.form.valid) {
      this.createCorpMutation
        // @ts-ignore
        .mutateAsync({ ...this.form.value, publicKey: 'NO_KEY' })
        .then(() => callback?.());
    } else console.log('Form invalid');
  }

  findCorpById(corpList: CorporationResponseDTO[], id: string) {
    return corpList.find((it) => it.id === id) ?? null;
  }
}
