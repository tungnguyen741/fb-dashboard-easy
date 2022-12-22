import React, { HTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface IButton {}

export const Button: React.FC<IButton & HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={[styles.Button, className].join(" ")} {...props}>
      {children}
      {/* <img src={require("../../assets/close.svg")} alt="" /> */}
    </div>
  );
};
