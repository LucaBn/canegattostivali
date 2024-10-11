import React, { useState, useEffect, useRef } from "react";

// Components
import { Container /*, Nav */, Navbar } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

// TODO: move this to an utils file
const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const NavbarComponent: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // const toggleNavbarDropdownStatus = () => {
  //   setExpanded((prevValue) => !prevValue);
  // };

  const closeNavbarDropdown = () => {
    setExpanded(false);
  };

  const handleLogoClick = () => {
    closeNavbarDropdown();
    scrollToTop();
  };

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="navbar navbar-dark bg-dark border-bottom"
        expanded={expanded}
        ref={navbarRef as React.RefObject<HTMLDivElement>}
      >
        <Container>
          <Navbar.Brand onClick={handleLogoClick} className="py-0">
            CaneGattoStivali
          </Navbar.Brand>
          {/* TODO: add here a button to toggle dark-light theme */}
          {/* <Navbar.Toggle
            aria-controls="navbar-collpsable"
            onClick={toggleNavbarDropdownStatus}
          />
          <Navbar.Collapse onClick={closeNavbarDropdown} id="navbar-collpsable">
            <Nav className="ms-auto">
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
