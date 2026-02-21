import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuItem, SidebarSubmenuItem } from './types';

@Component({
  selector: 'sidebar-widget',
  imports: [SvgIcon],
  templateUrl: './sidebar.widget.html',
  styleUrl: './sidebar.widget.css',
})
export class SidebarWidget {
  submenu = signal<SidebarSubmenuItem[]>([]);

  router = inject(Router);
  menu: SidebarMenuItem[] = [
    {
      icon: 'dashboard',
      label: 'Главная',
      action: this.goTo(['/dashboard']),
    },
    {
      icon: 'funnel',
      label: 'Воронка',
      submenu: [
        {
          icon: 'funnel',
          label: 'Воронка продаж',
          action: this.goTo(['/funnel']),
        },
      ],
    },
  ];

  private goTo(url: string[]) {
    return () => this.router.navigate(url);
  }

  public onSidebarMenuItemClick(item: SidebarMenuItem) {
    if (this.submenu() !== item.submenu) {
      this.submenu.set([]);
    }

    if (!!item.submenu) {
      if (this.submenu() !== item.submenu) {
        this.submenu.set(item.submenu);
      } else {
        this.submenu.set([]);
      }
    } else if (item.action) {
      item.action();
    }
  }

  public onSidebarSubmenuItemClick(item: SidebarSubmenuItem) {
    this.submenu.set([]);
    if (item.action) {
      item.action();
    }
  }
}
