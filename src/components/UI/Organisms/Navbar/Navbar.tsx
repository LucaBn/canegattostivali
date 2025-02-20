import React /* useState, useEffect, useRef */ from "react";

// Components
import { Image } from "react-bootstrap";
import { Container, Navbar } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

// Hook
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { ThemeList } from "@/constants/themes";

// Constants
import IconSun from "../../Atoms/IconSun/IconSun";
import IconMoon from "../../Atoms/IconMoon/IconMoon";

// TODO: move this to an utils file
const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const NavbarComponent: React.FC = () => {
  // const [expanded, setExpanded] = useState<boolean>(false);

  // const navbarRef = useRef<HTMLDivElement>(null);

  const { theme, changeTheme } = useTheme();

  // const handleOutsideClick = (event: MouseEvent) => {
  //   if (
  //     navbarRef.current &&
  //     !navbarRef.current.contains(event.target as Node)
  //   ) {
  //     setExpanded(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  // const toggleNavbarDropdownStatus = () => {
  //   setExpanded((prevValue) => !prevValue);
  // };

  // const closeNavbarDropdown = () => {
  //   setExpanded(false);
  // };

  const handleLogoClick = () => {
    // closeNavbarDropdown();
    scrollToTop();
  };

  const toggleTheme = () => {
    theme === "light"
      ? changeTheme("dark" as ThemeList)
      : changeTheme("light" as ThemeList);
  };

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="navbar navbar-dark bg-dark border-bottom py-1"
        // expanded={expanded}
        // ref={navbarRef as React.RefObject<HTMLDivElement>}
      >
        <Container>
          <Navbar.Brand
            onClick={handleLogoClick}
            className="cursor-pointer p-0"
            title="Cane Gatto Stivali"
          >
            <Image
              src="/assets/img/logo.png"
              height={56}
              width={56}
              alt="Cane Gatto Stivali"
              draggable={false}
            />
          </Navbar.Brand>

          <span
            onClick={toggleTheme}
            className="cursor-pointer"
            title="Cambia il tema"
          >
            {theme === "dark" ? (
              <IconMoon forceColor="#fff" />
            ) : (
              <IconSun forceColor="#fff" />
            )}
          </span>
          {/* <LinkContainer to={`/one`}>

          {/* <Navbar.Toggle
            aria-controls="navbar-collpsable"
            onClick={toggleNavbarDropdownStatus}
          /> */}
          {/* <Navbar.Collapse onClick={closeNavbarDropdown} id="navbar-collpsable">
            <Nav className="ms-auto gap-1">
              <LinkContainer to={`/one`}>
                <Nav.Link>Link One</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/two`}>
                <Nav.Link>Link Two</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/three`}>
                <Nav.Link>Link Three</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
