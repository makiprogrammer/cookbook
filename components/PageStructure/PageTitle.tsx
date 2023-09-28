import classNames from "classnames";

import { ClassName } from "global/types";

import styles from "./PageTitle.module.css";

export interface PageTitleProps {
  children: React.ReactNode;
  className?: ClassName;
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <header className={classNames(styles.root, className)}>{children}</header>
  );
}
