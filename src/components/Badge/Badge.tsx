import React, { HTMLAttributes } from "react";
import styles from "./Badge.module.scss";

interface IBadge {
  type?: "success" | "warning" | "danger";
}

export const Badge: React.FC<IBadge & HTMLAttributes<HTMLElement>> = ({
  children = null,
  type = "success",
  className = "",
}) => {
  return (
    <div
      className={[styles.Badge, styles[`Badge__${type}`], className].join(" ")}
    >
      {children}
    </div>
  );
};

export default Badge;
