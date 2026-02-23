import { AppIcon } from '../svg-icon/icons';

export interface DropdownItem {
  icon?: AppIcon;
  label?: string;
  color?: string;
  onClick?: () => unknown;
  value: string;
}
