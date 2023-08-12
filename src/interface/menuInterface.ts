export interface ISubMenu {
  name: string;
  href: string;
}

export interface IMenu {
  icon: React.ReactNode;
  name: string;
  href: string;
  subMenu: ISubMenu[];
}

export interface IMenuHeader {
  name: string;
  menus: IMenu[];
}
