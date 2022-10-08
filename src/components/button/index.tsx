import React, { ButtonHTMLAttributes } from "react";
import { PropsWithChildren } from "react";
import { FC } from "react";
import classNames from "classnames";
import "./index.less";

type ButtonProps = {
  type?: "default" | "primary" | "secondary" | "dashed" | "text" | "outline" | 'icon';
  color?: "danger" | "success"
  disable?: boolean;
  border?: boolean;
  size?: "mini" | "small" | "normal" | "large" | "largest";
} & Omit<ButtonHTMLAttributes<any>, "type"> &
  PropsWithChildren<unknown>;
const Button: FC<ButtonProps> = ({
  color,
  type = "default",
  className,
  disable = false,
  border = true,
  onClick,
  children,
  size = "normal",
  ...rest
}) => {
  const btnClass = classNames("ks-button h-8 px-6 text-base", className, color, {
    "ks-button-primary": type === "primary",
    "ks-button-icon": type === "icon",
    "ks-button-disable": disable,
    "h-10 px-8 text-lg": size === "large",
    "h-12 px-10 text-xl": size === "largest",
    "h-6 px-2 text-sm": size === "mini",
    "icon": type === 'icon',
  });
  const _onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disable) return;
    onClick && onClick(event);
  };
  return (
    <button className={btnClass} onClick={_onClick} {...rest}>
      {children}
    </button>
  );
};
export default Button;
