import { Dropdown } from '@/common-ui/dropdown/dropdown';
import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { injectDeleteCorporationMutation } from '@/models/corporations/corporation.mutation';
import { injectAllUserCorporations } from '@/models/corporations/corporation.query';
import { Component } from '@angular/core';

@Component({
  selector: 'corporation-list',
  imports: [SvgIcon, Dropdown],
  templateUrl: './corporation-list.html',
  styleUrl: './corporation-list.css',
})
export class CorporationList {
  allCorpQuery = injectAllUserCorporations();

  corpDeleteMutation = injectDeleteCorporationMutation();

  deleteCorpArrow(id: string) {
    return () => this.corpDeleteMutation.mutate(id);
  }
}
