import { Dropdown } from '@/common-ui/dropdown/dropdown';
import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
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
}
