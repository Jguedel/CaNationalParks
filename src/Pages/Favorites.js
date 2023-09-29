import NavBar from "../Components/NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { parkData } from "../Data/parkData";
import SinglePark from "../Components/singlePark";
import { getFromLoc } from "../Components/DataHandling";

const Favorites = () => {
  let parkInfo = useContext(parkData).data;
  parkInfo = parkInfo.data;
  let curUser = getAuth().currentUser;
  const [check, setChecked] = useState(true);
  const [userFavs, setUserFavs] = useState((userFavs) =>
    getFromLoc("favs", true)
  );

  useEffect(() => {
    setUserFavs((userFavs) => getFromLoc("favs", true));
  }, [check]);
  const changing = () => {
    return setChecked((check) => !check);
  };

  if (curUser != null) {
    return (
      <Container fluid>
        <NavBar />
        <h2>Favorites</h2>
        {parkInfo.map((prop) => {
          if (prop.images.length >= 1) {
            if (userFavs["Fav"].includes(prop.fullName)) {
              return (
                <SinglePark prop={prop} handle={changing} key={prop.fullName} />
              );
            }
          }
        })}
      </Container>
    );
  } else {
    return (
      <Container fluid>
        <NavBar />
        <h2>Favorites</h2>
        <p>YOU ARE NOT SIGNED IN, PLEASE SIGN IN TO FAVORITE ITEMS</p>
      </Container>
    );
  }
};

export default Favorites;
