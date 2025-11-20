import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/app-logo.png";

const Header = () => {
  const location = useLocation();
  const isAboutUsPage = location.pathname === "/about-us";

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="header-navbar"
      dir="ltr"
      collapseOnSelect
    >
      <Container fluid className="header-container">
        <Navbar.Brand as={Link} to="/" className="header__logo">
          <img alt="logo" src={logo} className="header__logo-img" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="header__text">
            {isAboutUsPage ? (
              <Nav.Link as={Link} to="/">
                לעמוד הבית
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/about-us">
                קצת עלינו
              </Nav.Link>
            )}
            <Nav.Link href="#private">כניסה לחשבונך</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
