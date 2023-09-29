import { getAuth } from "firebase/auth";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const signedInOrOut = () => {
    if (getAuth().currentUser == null) {
      return "Sign In/Up";
    } else {
      return "Sign Out";
    }
  };
  const showFav = () => {
    if (getAuth().currentUser != null) {
      return (
        <Col lg={1}>
          <Nav.Item as="li">
            <Link to={"/Favorites"}>Favorites</Link>
          </Nav.Item>
        </Col>
      );
    }
  };
  return (
    <Container fluid className="sticky">
      <Row>
        <Nav sticky="top" className="bg-black sticky-top" as="ul">
          <Col lg={10} className="inline">
            <Row>
              <Col lg={1}>
                <Nav.Item as="li">
                  <Link to={"/"}>Home</Link>
                </Nav.Item>
              </Col>
              <Col lg={1}>
                <Nav.Item as="li">
                  <Link to={"/NationalParks"}>Parks</Link>
                </Nav.Item>
              </Col>
              {showFav()}
            </Row>
          </Col>
          <Col lg={2} className=" justify-content-end">
            <Nav.Item as="li">
              <Link to={"/Account"}>{signedInOrOut()}</Link>
            </Nav.Item>
          </Col>
        </Nav>
      </Row>
    </Container>
  );
};

export default NavBar;
