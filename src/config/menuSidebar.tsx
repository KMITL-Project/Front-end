import { IMenuHeader } from "@/interface/menuInterface";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const menuSidebar: IMenuHeader[] = [
  {
    name: "dashboard",
    menus: [
      {
        icon: <DashboardIcon />,
        name: "Dashboard",
        href: "#",
        subMenu: [
          {
            name: "test1",
            href: "#",
          },
          {
            name: "test2",
            href: "#",
          },
          {
            name: "test3",
            href: "#",
          },
        ],
      },
    ],
  },
  {
    name: "management",
    menus: [
      {
        icon: <DashboardIcon />,
        name: "Dashboard",
        href: "#",
        subMenu: [
          {
            name: "test",
            href: "#",
          },
          {
            name: "test",
            href: "#",
          },
          {
            name: "test",
            href: "#",
          },
        ],
      },
    ],
  },
];
