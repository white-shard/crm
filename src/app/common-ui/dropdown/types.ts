export interface DropdownItem {
  icon?: string;
  label?: string;
  color?: string;
  onClick?: () => unknown;
  value: string;
}
