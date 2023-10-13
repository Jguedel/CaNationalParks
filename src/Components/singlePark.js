import { useContext, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { parkData } from "../Data/parkData";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { Link } from "react-router-dom";
import { addToLoc, getFromLoc } from "./DataHandling";

const SinglePark = ({ prop, handle }) => {
  const db = getFirestore(getApp());
  let parkInfo = useContext(parkData).data;
  parkInfo = parkInfo.data;
  let curUser = getAuth().currentUser;
  const [userFavs, setUserFavs] = useState((userFavs) =>
    getFromLoc("favs", true)
  );

  const addFav = (prop) => {
    let favString = getFromLoc("favs", true)["Fav"];
    favString += ` ${prop}`;
    addToLoc({ Fav: favString }, "favs", true);
    setUserFavs((userFavs) => getFromLoc("favs", true));
    async function add() {
      await setDoc(doc(db, "userFavs", curUser.uid), {
        Fav: favString,
      });
    }
    add();
  };

  const delFav = (prop) => {
    let favString = getFromLoc("favs", true)["Fav"];
    favString = favString.replace(prop, "");
    addToLoc({ Fav: favString }, "favs", true);
    async function del() {
      await setUserFavs((userFavs) => getFromLoc("favs", true));
      await setDoc(doc(db, "userFavs", curUser.uid), {
        Fav: favString,
      });
    }
    del();
  };

  const favCheck = (pName) => {
    let favText = "";
    if (userFavs["Fav"].includes(pName)) {
      favText = (
        <Button
          variant="dark"
          onClick={() => {
            delFav(pName);
            handle();
          }}
        >
          {"Delete Fav"}
        </Button>
      );
    } else {
      favText = (
        <Button
          variant="dark"
          onClick={() => {
            addFav(pName);
            handle();
          }}
        >
          {"Add Fav"}
        </Button>
      );
    }
    if (curUser != null) {
      return favText;
    } else {
      return null;
    }
  };
  if (prop.images.length >= 1) {
    return (
      <div>
        <Row
          className="jusify-content-center singlePark"
          style={{ margin: "10px" }}
          key={prop.id}
        >
          <Col
            lg={{ span: 8, offset: 2 }}
            style={{ border: "2px solid black", borderRadius: "8px" }}
          >
            <h3>{prop.fullName}</h3>
            <div
              style={{
                backgroundImage: `URL(${prop.images[0].url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "400px",
                width: "75%",
                margin: "auto",
              }}
            />
            <Link to={`/MoreInfo/${prop.fullName}/${prop.id}`}>
              <Button variant="dark">MORE INFO</Button>
            </Link>
            {favCheck(prop.fullName)}
          </Col>
        </Row>
      </div>
    );
  }
};

export default SinglePark;
