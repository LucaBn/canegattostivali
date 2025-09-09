import React from "react";

// Components
import { Container, Navbar, Image } from "react-bootstrap";
import CustomWordListButton from "@/components/UI/Organisms/CustomWordListButton/CustomWordListButton";
import NewsButton from "@/components/UI/Organisms/NewsButton/NewsButton";
import OptionsButton from "@/components/UI/Organisms/OptionsButton/OptionsButton";
import UserButton from "@/components/UI/Organisms/UserButton/UserButton";

// Utils
import { playSound } from "@/utils/sounds";

// TODO: move this to an utils file and refactor all scroll functions
const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const NavbarComponent: React.FC = () => {
  const handleLogoClick = () => {
    if (window.scrollY > 0) {
      playSound("/assets/sounds/scroll-to-top.wav");
    }

    scrollToTop();
  };

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
            <OptionsButton />
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
