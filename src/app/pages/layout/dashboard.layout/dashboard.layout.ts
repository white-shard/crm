import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Gravatar } from '../../../common-ui/gravatar/gravatar';
import { NotificationBtn } from '../../../common-ui/notification-btn/notification-btn';
import { SidebarWidget } from '../../../widgets/sidebar.widget/sidebar.widget';

@Component({
  selector: 'app-dashboard.layout',
  imports: [RouterOutlet, SidebarWidget, Gravatar, NotificationBtn],
  templateUrl: './dashboard.layout.html',
  styleUrl: './dashboard.layout.css',
})
export class DashboardLayout {}
