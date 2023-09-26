import { IconType } from "components/Icon";

export interface NavigationItem {
  href: string;
  label: string;
  icon?: IconType;
}

export const NAVIGATION_LINKS: NavigationItem[] = [
  { href: "/explore", label: "Explore", icon: "globe" },
  { href: "/planner", label: "Planner", icon: "calendar" },
  { href: "/profile", label: "My Profile", icon: "user" },
];
