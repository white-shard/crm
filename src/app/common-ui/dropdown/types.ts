export interface DropdownItem {
  icon?: string;
  label?: string;
  color?: string;
  onSelect?: () => unknown;
  value: string;
}
