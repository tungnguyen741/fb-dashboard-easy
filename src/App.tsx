import React, { FC, Suspense, useState } from "react";
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
import { Badge, Button } from "./components";
import { calcAddNumber } from "./utils";
const Image = React.lazy(() => import("./components/Image/Image"));

console.log("calcAddNumber:", calcAddNumber);
const App: FC = () => {
  const [counter, setCounter] = useState(0);
  const [type, setType] = useState<"success" | "warning" | "danger">("success");
  // console.log("CloseSvg", closeSvg);
  return (
    <div className={styles.App}>
      {/* {calcAddNumber(10, 20)} */}
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
      {/* <Button onClick={() => setCounter((prev) => prev - 1)}>-</Button>
      <Badge type={type}>{counter}</Badge>
      <Button onClick={() => setCounter((prev) => prev + 1)}>+</Button>
      <div>
        <Button onClick={() => setType("warning")}>Warning</Button>
        <Button onClick={() => setType("danger")}>Danger</Button>
        <Button onClick={() => setType("success")}>Success</Button>
      </div>
      <div className={styles.img}>
        <img src={imgmottiny} alt="" />
      </div>
      <div className={styles.img}>
        <img src={imgmot} alt="" />
      </div>
      <div>
        <div>
          Path img: <img src={FlatIconSvg} alt="star" />
        </div>
        <br />
        <br /> */}

      {/* <div className={styles.img}>
          <img src={img1} alt="" />
        </div>
        <div className={styles.img}>
          <img src={img2} alt="" />
        </div>
        <div className={styles.img}>
          <img src={img3} alt="" />
        </div>
        <div className={styles.img}>
          <img src={img4} alt="" />
        </div>
      </div> */}
      {/* {closeSvg()} */}
    </div>
  );
};

export default App;
