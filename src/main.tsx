import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

// Providers
import { Providers } from "@/components/providers";

// CSS
import "@/styles/index.scss";

// Service Worker Registration
registerSW();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
