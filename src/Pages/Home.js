import NavBar from "../Components/NavBar";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../homePG.png";
const Home = () => {
  return (
    <div>
      <NavBar />
      <Container fluid className="pageStlye">
        <Row>
          <Col style={{ marginTop: "1rem" }}>
            <h2>Welcome to the CA National Parks website</h2>
            <p>
              The purpose of this site is for you to find CA National Parks that
              you may want to visit
            </p>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginBottom: "1rem" }}>
            <img
              src={logo}
              alt="home page img"
              style={{ maxHeight: "700px", maxWidth: "50%" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
