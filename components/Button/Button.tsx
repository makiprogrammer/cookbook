import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

import { IconType, Icon } from "components/Icon";

import styles from "./Button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "primary" | "secondary" | "white";
  icon?: IconType;
};

export function Button({
  theme = "secondary",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(className, styles.common, styles[theme], {
        [styles.onlyIcon]: !children && icon,
        [styles.iconWithText]: children && icon,
      })}
      {...props}
    >
      {icon && <Icon type={icon} />}
      {children}
    </button>
  );
}
