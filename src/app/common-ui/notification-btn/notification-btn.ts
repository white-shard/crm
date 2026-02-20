import { Component, Input } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';

@Component({
  selector: 'notification-btn',
  imports: [SvgIcon],
  templateUrl: './notification-btn.html',
  styleUrl: './notification-btn.css',
})
export class NotificationBtn {
  @Input() isNotificationExists: boolean = false;
}
