import React, { HTMLAttributes } from "react";
// import closeSvg from "../../assets/close.svg";
import styles from "./Button.module.scss";

interface IButton {}

export const Button: React.FC<IButton & HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className={styles.ButtonClassName} {...props}>
      {children}
      {/* <img src={require("../../assets/close.svg")} alt="" /> */}
    </div>
  );
};
