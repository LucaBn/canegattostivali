import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import App from "@/components/App/App";
import HomePage from "@/components/UI/Templates/HomePage/HomePage";
import Error404 from "@/components/UI/Templates/Error404/Error404";

export const ReactRouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
