"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "components/Icon";
import { NavigationItem } from "global/navigation";

import styles from "./Header.module.css";

export default function HeaderLink({ href, label, icon }: NavigationItem) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={classNames(styles.link, {
        [styles.active]: href == pathname,
      })}
    >
      <button>
        {icon && <Icon type={icon} />}
        {label}
      </button>
    </Link>
  );
}
