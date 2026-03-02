import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { NgComponentOutlet } from '@angular/common';
import { Component, inject, signal, Type } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuItem, SidebarSubmenuItem } from './types';
import { SalesFunnel } from './ui/sales-funnel/sales-funnel';

@Component({
  selector: 'sidebar-widget',
  imports: [SvgIcon, NgComponentOutlet],
  templateUrl: './sidebar.widget.html',
  styleUrl: './sidebar.widget.css',
})
export class SidebarWidget {
  submenu = signal<SidebarSubmenuItem[]>([]);
  component = signal<Type<any> | null>(null);

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
      component: SalesFunnel,
    },
  ];

  private goTo(url: string[]) {
    return () => this.router.navigate(url);
  }

  public onSidebarMenuItemClick(item: SidebarMenuItem) {
    if (item.submenu) {
      this.component.set(null);
      this.submenu.update((current) => (current === item.submenu ? [] : item.submenu!));
      return;
    }

    if (item.component) {
      this.submenu.set([]);
      this.component.update((current) => (current === item.component ? null : item.component!));
      return;
    }

    item.action?.();
  }

  public onSidebarSubmenuItemClick(item: SidebarSubmenuItem) {
    this.submenu.set([]);
    if (item.action) {
      item.action();
    }
  }
}
