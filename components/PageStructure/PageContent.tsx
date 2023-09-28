import classNames from "classnames";

import { ClassName } from "global/types";

import styles from "./PageContent.module.css";

export interface PageContentProps {
  children: React.ReactNode;
  className?: ClassName;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <article className={classNames(styles.root, className)}>{children}</article>
  );
}
