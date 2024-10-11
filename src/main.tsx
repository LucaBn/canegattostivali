import React from "react";
import ReactDOM from "react-dom/client";

// Providers
import { Providers } from "@/components/providers";

// CSS
import "@/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
