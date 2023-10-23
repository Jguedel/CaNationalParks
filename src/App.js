//UTILES
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
//STYLE
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home";
import Parks from "./Pages/Parks";
import Favorites from "./Pages/Favorites";
import SignInUp from "./Pages/signInUp";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import NavBar from "./Components/NavBar";
import { Container } from "react-bootstrap";
import { addToLoc } from "./Components/DataHandling";
import MoreInfo from "./Pages/MoreInfo";

function App() {
  //make sure you are signed out when you reload the page
  let auth = getAuth();
  useEffect(() => {
    signOut(auth)
      .then(localStorage.clear(), addToLoc({ Fav: "" }, "favs", true))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/CaNationalParks/"
            element={<Home />}
            className="float-left"
          />
          <Route path="/NationalParks" element={<Parks />} />
          <Route path="/Account" element={<SignInUp />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/MoreInfo/:parkName/:parkId" element={<MoreInfo />} />
          <Route
            path="/*"
            element={
              <Container fluid>
                <NavBar />
                <h1>404 Error</h1>
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
