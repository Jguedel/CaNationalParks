import { getAuth } from "firebase/auth";
import { Col, Container, Nav, Row, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const signedInOrOut = () => {
    if (getAuth().currentUser == null) {
      return "Sign In/Up";
    } else {
      return "Profile";
    }
  };
  const showFav = () => {
    if (getAuth().currentUser != null) {
      return (
        <Col lg={1}>
          <Nav.Link as={Link} to={"/Favorites"}>
            Favorites
          </Nav.Link>
        </Col>
      );
    }
  };
  return (
    <Navbar expand="lg" className="sticky" bg="success" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/CaNationalParks"}>
          CA National Parks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/NationalParks"}>
              Parks
            </Nav.Link>
            {showFav()}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to={"/Account"} className="justify-content-end">
              {signedInOrOut()}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
