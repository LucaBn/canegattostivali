import { ReactNode } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import App from "@/components/App/App";
import HomePage from "@/components/UI/Templates/HomePage/HomePage";

const Error404: ReactNode = <p>Error 404</p>;

export const ReactRouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={Error404} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
