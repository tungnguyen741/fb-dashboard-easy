import React, { HTMLAttributes } from "react";
// import styles from "./LoginFBButton.module.scss";

export const LoginFBButton: React.FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <div
    // className={styles.LoginFBButton}
    >
      <div
        className="fb-login-button"
        data-size="large"
        data-button-type="login_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
        {...props}
      />
    </div>
  );
};

export default LoginFBButton;
