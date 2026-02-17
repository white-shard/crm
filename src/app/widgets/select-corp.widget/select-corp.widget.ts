import { Component, Input, signal } from '@angular/core';
import { Dialog } from '../../common-ui/dialog/dialog';
import { DialogCloseDirective } from '../../common-ui/dialog/directive/dialog-close.directive';
import { SvgIcon } from '../../common-ui/svg-icon/svg-icon';

@Component({
  selector: 'select-corp-widget',
  imports: [SvgIcon, Dialog, DialogCloseDirective],
  templateUrl: './select-corp.widget.html',
  styleUrl: './select-corp.widget.css',
})
export class SelectCorpWidget {
  // TODO Загружать список компаний пользователя
  @Input() corpList: string[] = [];

  hasDropdownOpened = signal<boolean>(false);
  // TODO Вынести функционал выбранной компании в сервис
  selectedCorp = signal<string | null>(null);
}
