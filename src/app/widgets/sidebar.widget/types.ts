import { AppIcon } from '@/common-ui/svg-icon/icons';

export interface SidebarMenuItem {
  icon: AppIcon;
  label: string;
  submenu?: SidebarSubmenuItem[];
  action?: () => void;
}

export interface SidebarSubmenuItem {
  icon: AppIcon;
  label: string;
  action: () => void;
}
