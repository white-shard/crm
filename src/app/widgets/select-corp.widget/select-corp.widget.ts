import { Component, Input, signal } from '@angular/core';
import { SvgIcon } from '../../common-ui/svg-icon/svg-icon';

@Component({
  selector: 'select-corp-widget',
  imports: [SvgIcon],
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
