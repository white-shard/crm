import { Component, Input } from '@angular/core';
import { AppIcon } from './icons';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: [],
})
export class SvgIcon {
  @Input() icon: AppIcon = 'list';

  get href() {
    return `/assets/imgs/icons/${this.icon}.svg#${this.icon}`;
  }
}
