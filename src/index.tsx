import React from "react";
import ReactDOM from "react-dom";
import ReactPixel from "react-facebook-pixel";
import App from "./App";
import AppProvider from "./AppContext";
const PIXEL_ID = "333765161921328";

ReactPixel.fbq("set", "autoConfig", false, PIXEL_ID);
ReactPixel.fbq("init", PIXEL_ID);
ReactPixel.pageView();

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
