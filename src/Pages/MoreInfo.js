import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { parkData } from "../Data/parkData";
import {
  Container,
  Row,
  Col,
  Button,
  Carousel,
  Navbar,
  Table,
} from "react-bootstrap";
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
  console.log(parkInfo);
  return (
    <div>
      <NavBar />
      <Container fluid className="pageStlye">
        <Row>
          <Col xl={{ span: 1 }}>
            <Link to={"/CaNationalParks/NationalParks"}>
              <Button variant="dark">Back</Button>
            </Link>
          </Col>
          <Col>
            <h1>{parkOn["name"]}</h1>
            <p style={{ color: "black", fontSize: ".8em" }}>
              Lat: {parkOn["latitude"]}, Long: {parkOn["longitude"]}
              <a
                href={parkOn["url"]}
                style={{ color: "black", fontSize: "1.2em" }}
                className="linkHover"
              >
                Link to park website
              </a>
            </p>
          </Col>
          <Col xl={{ span: 1 }}></Col>
        </Row>

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
          <Col>
            <h3>Description</h3>
            <p>{parkOn["description"]}</p>
          </Col>
        </Row>
        <Row>
          <Col xl={{ span: 6, offset: 3 }}>
            <h3>Activities</h3>
            <Table striped bordered responsive variant="dark">
              <tbody>
                <tr>
                  {parkOn["activities"].map((props, index) => {
                    return <td key={index}>{props["name"]}</td>;
                  })}
                </tr>
              </tbody>
            </Table>
            <ul></ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Weather Info</h4>
            <p>{parkOn["weatherInfo"]}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoreInfo;
