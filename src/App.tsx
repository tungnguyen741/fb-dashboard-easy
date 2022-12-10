import React, { FC, Suspense, useEffect, useState } from "react";
import styles from "./App.module.scss";
import imgmottiny from "./assets/tiny1.png";
import imgmot from "./assets/1.png";
import img1 from "./assets/img-1.1mb.png";
import img2 from "./assets/img-957kb.png";
import img3 from "./assets/img-444kb.png";
import img4 from "./assets/img-287kb.png";
import CloseSvg from "./assets/close.svg";

import FlatIconSvg, {
  ReactComponent as FlatIconSvgCom,
} from "./assets/Flat_tick_icon.svg";
const BadgeLazy = React.lazy(() => import("./components/Badge/Badge"));
import { Badge, Button, LoginFBButton } from "@/components";
// import { Badge, Button } from "./components";
import { calcAddNumber } from "./utils";
const Image = React.lazy(() => import("./components/Image/Image"));

console.log("calcAddNumber:", calcAddNumber);
const App: FC = () => {
  const [counter, setCounter] = useState(0);
  const [type, setType] = useState<"success" | "warning" | "danger">("success");

  const [connected, setConnected] = useState(false);
  const [userLogged, setUserLogged] = useState({
    name: "",
    id: 0,
  });
  console.log("userLogged:", userLogged);
  // console.log("CloseSvg", closeSvg);

  useEffect(() => {
    FB.getLoginStatus(function (response) {
      console.log("response:", response);
      if (response.status === "connected") {
        setConnected(true);
        FB.api("/me", function (response) {
          setUserLogged((prev) => ({
            ...prev,
            id: response.id || 0,
            name: response.name || "",
          }));
        });
        return;
      }
      setConnected(false);
    });
  }, []);

  const handleLoginFB = () => {
    FB.login(function (response) {
      if (response.authResponse) {
        console.log("Welcome!  Fetching your information.... ");
        FB.api("/me", function (response) {
          setConnected(true);
          setUserLogged((prev) => ({
            ...prev,
            name: response.name || "",
            id: response.id || "",
          }));
        });
      } else {
        setConnected(false);
      }
    });
  };

  const handleLogoutFB = () => {
    FB.logout(function (response) {
      setConnected(false);
      setUserLogged((prev) => ({
        id: 0,
        name: "",
      }));
      // user is now logged out
    });
  };
  const handleGetInfo = () => {
    FB.api(userLogged.id, (response) => {
      console.log("response:", response);
    });
  };

  return (
    <>
      {userLogged.name && (
        <div>
          Hi <b>{userLogged.name}</b> !, Welcome to Dashboard
        </div>
      )}
      <div className={styles.App}>
        <Suspense fallback={<div>Loading...</div>}>
          <Button onClick={() => setCounter((prev) => prev - 1)}>-</Button>
          <BadgeLazy type={type}>{counter}</BadgeLazy>
          <Button onClick={() => setCounter((prev) => prev + 1)}>+</Button>
          <div>
            <Button onClick={() => setType("warning")}>Warning</Button>
            <Button onClick={() => setType("danger")}>Danger</Button>
            <Button onClick={() => setType("success")}>Success</Button>
          </div>
          {counter === 3 && <Image src={img1} />}
        </Suspense>

        {connected && <Button onClick={handleLogoutFB}>Đăng xuất</Button>}
        {!connected && (
          <Button onClick={handleLoginFB}>Đăng nhập với FB</Button>
        )}
        <Button onClick={handleGetInfo}>Get INFO</Button>
      </div>
    </>
  );
};

export default App;
