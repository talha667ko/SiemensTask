import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n.ts";
import { IxApplicationContext } from "@siemens/ix-react";

createRoot(document.getElementById("root")!).render(
  <IxApplicationContext>
    <StrictMode>
      <App />
    </StrictMode>
  </IxApplicationContext>
);
