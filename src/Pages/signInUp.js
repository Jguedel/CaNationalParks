import NavBar from "../Components/NavBar";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { addToLoc, getFromLoc } from "../Components/DataHandling";
import { Await, Navigate, useNavigate } from "react-router-dom";

const SignInUp = () => {
  const auth = getAuth();
  const [curUser, setCurUser] = useState(auth.currentUser);
  const [validated, setValidated] = useState(false);
  let db = getFirestore(getApp());
  let navigate = useNavigate();
  useEffect(() => {
    getDb();
  }, [curUser]);
  const handleSubmit = (event) => {
    // console.log(event);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      let email = form.querySelector("#validationCustom01").value;
      let pass = form.querySelector("#validationCustom02").value;
      Login(email, pass);
    }
    setValidated(true);
  };

  async function getDb() {
    let ans = null;
    db = getFirestore(getApp());
    if (curUser != null) {
      const querySnapshot = await getDocs(collection(db, "userFavs"));
      await querySnapshot.forEach((doc) => {
        if (doc.id === curUser.uid) {
          ans = doc.data();
          addToLoc(ans, "favs", true);
        }
      });
    }
    // console.log(getFromLoc("favs", true));
  }

  async function reDirect() {
    navigate("/Favorites");
  }
  const Login = (email, pass) => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        addToLoc(user, "curUser", true);
        setCurUser((curUser) => auth.currentUser);
        //reDirect();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode);
        // console.log(errorMessage);
        if (errorCode === "auth/invalid-login-credentials") {
          alert("incorrect Login info please try again or create an account");
        }
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // console.log("sign out");
        setCurUser((curUser) => null);
        localStorage.clear();
        addToLoc({ Fav: "" }, "favs", true);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const ClickedCreate = (e) => {
    const form = e.currentTarget.parentElement;
    let email = form.querySelector("#validationCustom01").value;
    let pass = form.querySelector("#validationCustom02").value;
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        setCurUser((curUser) => auth.currentUser);
        addToLoc(user, "curUser", true);
        getDb();
        async function setList() {
          await setDoc(doc(db, "userFavs", auth.currentUser.uid), {
            Fav: "",
          });
        }
        setList();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          alert("Email already in use please try another");
        }
        // ..
      });
  };

  const passReset = () => {
    sendPasswordResetEmail(auth, curUser["email"])
      .then(() => {
        alert(`Password reset email sent to ${curUser["email"]}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  if (curUser != null) {
    return (
      <div>
        <NavBar />
        <Container fluid className="pageStlye">
          <h2>Account Info</h2>
          <p>Email: {curUser["auth"]["currentUser"]["email"]}</p>
          <Button variant="dark" onClick={passReset}>
            Reset password
          </Button>
          <br />
          <Button variant="dark" onClick={logOut}>
            sign out
          </Button>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <Container fluid className="pageStlye">
          <h2>sign In</h2>
          <Row className="justify-content-xl-center">
            <Col xl={6}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3 justify-content-xl-center">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="example@gmail.com"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Email.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Enter a Password"
                      minLength={6}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Password needs to be at least 6 characters long
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button variant="dark" type="submit">
                  Sign In
                </Button>
                <br />
                <Button variant="dark" onClick={ClickedCreate}>
                  Create
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default SignInUp;
