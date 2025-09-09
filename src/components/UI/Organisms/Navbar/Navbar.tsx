import React from "react";

// Components
import { Button, Image } from "react-bootstrap";
import { Container, Navbar } from "react-bootstrap";
import IconSun from "@/components/UI/Atoms/IconSun/IconSun";
import IconMoon from "@/components/UI/Atoms/IconMoon/IconMoon";
import CustomWordListButton from "@/components/UI/Organisms/CustomWordListButton/CustomWordListButton";
import NewsButton from "@/components/UI/Organisms/NewsButton/NewsButton";
import UserButton from "@/components/UI/Organisms/UserButton/UserButton";

// Utils
import { playSound } from "@/utils/sounds";

// Hook
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { ThemeList } from "@/typings/themes";

// TODO: move this to an utils file and refactor all scroll functions
const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const NavbarComponent: React.FC = () => {
  const { theme, changeTheme } = useTheme();

  const handleLogoClick = () => {
    if (window.scrollY > 0) {
      playSound("/assets/sounds/scroll-to-top.wav");
    }

    scrollToTop();
  };

  const toggleTheme = () => {
    playSound("/assets/sounds/click-positive.wav");

    theme === "light"
      ? changeTheme("dark" as ThemeList)
      : changeTheme("light" as ThemeList);
  };

  const toggleThemeIcon: JSX.Element =
    theme === "dark" ? (
      <IconMoon forceColor="#fff" />
    ) : (
      <IconSun forceColor="#fff" />
    );

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="navbar navbar-dark bg-dark border-bottom py-1"
      >
        <Container>
          <Navbar.Brand
            onClick={handleLogoClick}
            className="cursor-pointer p-0"
            title="Cane Gatto Stivali"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLogoClick();
                e.preventDefault();
              }
            }}
          >
            <Image
              src="/assets/img/logo.png"
              height={56}
              width={56}
              alt="Cane Gatto Stivali"
              draggable={false}
            />
          </Navbar.Brand>

          <span>
            <Button
              aria-label="Cambia il tema"
              title="Cambia il tema"
              variant="link"
              onClick={toggleTheme}
            >
              {toggleThemeIcon}
            </Button>
            <NewsButton />
            <CustomWordListButton />
            <UserButton />
          </span>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
