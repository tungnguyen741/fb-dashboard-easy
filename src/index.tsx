import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga";
import App from "./App";
import "./index.scss";

ReactGA.initialize("G-Q4P0JZTLRG", {
  debug: true,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />

  // </React.StrictMode>
);
