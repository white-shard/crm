import { Component, Input } from '@angular/core';

@Component({
  selector: 'gravatar',
  imports: [],
  templateUrl: './gravatar.html',
  styleUrl: './gravatar.css',
})
export class Gravatar {
  @Input() avatarURL: string = '';
  @Input() displayName: string = 'IV';

  getInitials(displayName: string): string {
    let result = 'IV';
    const s = displayName.trim().split(' ');
    if (s.length > 1) {
      if (s[0].length && s[1].length) {
        result = `${s[0][0]}${s[1][0]}`;
      } else if (s[0].length) {
        result = s[0][0];
      }
    } else if (s[0].length) {
      result = s[0][0];
    }
    return result.toUpperCase();
  }
}
