import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "@/components/UI/Organisms/Navbar/Navbar";
import Footer from "@/components/UI/Organisms/Footer/Footer";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Constants
import { ThemeList } from "@/typings/themes";
import { RUN_TEST } from "@/constants/app";

// Tests
import {
  runWordListTest,
  sortWordsByNextWordListLength,
} from "@/tests/wordListTest";
import { runLevelListTest } from "@/tests/levelListTest";

const App: React.FC = () => {
  const { theme } = useTheme();

  const textColorClass =
    theme === ThemeList.Dark
      ? `text-${ThemeList.Light}`
      : `text-${ThemeList.Dark}`;

  document.body.dataset.bsTheme = theme;

  // TODO: find a better place to run tests
  if (RUN_TEST === "true") {
    runLevelListTest();
    runWordListTest();
    sortWordsByNextWordListLength();
  }

  return (
    <div className={`${textColorClass}`}>
      <Navbar />
      <main className="bg-body-secondary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
