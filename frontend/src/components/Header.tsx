import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/images/app-logo.png";

const Header = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="header-navbar"
      dir="ltr"
      collapseOnSelect
    >
      <Container fluid className="header-container">
        <Navbar.Brand href="#home" className="header__logo">
          <img alt="logo" src={logo} className="header__logo-img" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="header__text">
            <Nav.Link href="#private">קצת עלינו</Nav.Link>
            <Nav.Link href="#private">כניסה לחשבונך</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
