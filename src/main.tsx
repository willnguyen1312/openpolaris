import "@shopify/polaris/build/esm/styles.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components/App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
