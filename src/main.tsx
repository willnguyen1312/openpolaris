import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
