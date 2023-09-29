import { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import { parkData } from "../Data/parkData";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import singlePark from "../Components/singlePark";
import SinglePark from "../Components/singlePark";
import { getFromLoc } from "../Components/DataHandling";

const Parks = () => {
  const db = getFirestore(getApp());
  let parkInfo = useContext(parkData).data;
  parkInfo = parkInfo.data;
  let curUser = getAuth().currentUser;
  const [userFavs, setUserFavs] = useState({ Fav: "" });
  const [check, setChecked] = useState(true);
  useEffect(() => {
    setUserFavs((userFavs) => getFromLoc("favs", true));
  }, [check]);
  const changing = () => {
    return setChecked((check) => !check);
  };
  useEffect(() => {
    async function getDb() {
      const db = getFirestore(getApp());
      let curUser = getAuth().currentUser;
      let ans = { Fav: "" };
      if (curUser != null) {
        const querySnapshot = await getDocs(collection(db, "userFavs"));
        await querySnapshot.forEach((doc) => {
          if (doc.id == curUser.uid) {
            // console.log(`${doc.id} => ${doc.data()}`);
            ans = doc.data();
          }
        });
      }
      setUserFavs((userFavs) => ans);
    }
    getDb();
  }, []);

  return (
    <Container fluid>
      <NavBar />
      <h2>Parks</h2>
      {parkInfo.map((props) => {
        let img = props.images;
        if (props.images.length >= 1) {
          return (
            <SinglePark prop={props} handle={changing} key={props.fullName} />
          );
        }
      })}
    </Container>
  );
};

export default Parks;
