import React, { HTMLAttributes } from "react";
import styles from "./Badge.module.scss";

interface IBadge {
  type?: "success" | "warning" | "danger";
}

export const Badge: React.FC<IBadge & HTMLAttributes<HTMLElement>> = ({
  children = null,
  type = "success",
}) => {
  return (
    <div className={[styles.Badge, styles[`Badge__${type}`]].join(" ")}>
      {children}
    </div>
  );
};

export default Badge;
