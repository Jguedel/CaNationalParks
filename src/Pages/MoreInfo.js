import { useContext } from "react";
import { useParams } from "react-router-dom";
import { parkData } from "../Data/parkData";
import { Container, Row, Col, Button, Carousel, Navbar } from "react-bootstrap";
import NavBar from "../Components/NavBar";

const MoreInfo = () => {
  const { parkName, parkId } = useParams();
  const parkInfo = useContext(parkData).data.data;
  console.log(parkInfo);
  let parkOn = "";
  parkInfo.map((props) => {
    if (props["id"] === parkId) {
      parkOn = props;
    }
  });

  return (
    <Container fluid>
      <NavBar />
      <h1>{parkOn["name"]}</h1>
      <hr />
      <Row className="jusify-content-xl-center">
        <Col xl={{ span: 6, offset: 3 }}>
          <Carousel data-bs-theme="dark">
            {parkOn["images"].map((props) => {
              return (
                <Carousel.Item key={props["url"]}>
                  <img
                    className="d-block w-100"
                    src={props["url"]}
                    alt="First slide"
                    height={500}
                  />
                  <Carousel.Caption
                    style={{ background: "rgba(236, 236, 236,.8)" }}
                  >
                    <h3>{props["title"]}</h3>
                    <p>{props["caption"]}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col xl={{ span: 2, offset: 5 }}>
          <h3>Activities</h3>
          <ul>
            {parkOn["activities"].map((props) => {
              return <li>{props["name"]}</li>;
            })}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default MoreInfo;
