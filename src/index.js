import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MediaContextProvider from "./Context/MediaContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
const betaProps = [
  "baloney",
  "hike",
  "fallen",
  "booty",
  "soap",
  "capper",
  "civic",
  "hi",
  // "illustrator",
  // "photoshop",
  // "xd",
];
root.render(
  <React.StrictMode>
    <MediaContextProvider>
      <App />
    </MediaContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
