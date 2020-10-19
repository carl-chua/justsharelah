import React, { useContext } from "react";
import firebase from "../API/Firebase";
import { loadUser } from "../API/CurrentUser";
import { getAllListingsListener, getAllListings } from "../API/Listings";
import Album from "./Album";
import NavBar from "./NavBar";
import { Redirect } from "react-router";

function HomePage({ history }) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentListings, setListings] = React.useState({});

  function loadCurrentUser() {
    loadUser(setCurrentUser);
  }

  function loadCurrentListings() {
    getAllListings(setListings);
  }

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  React.useEffect(() => loadCurrentListings());

  function signOut() {
    firebase.auth().signOut();
    history.push("/login");
  }

  if (currentUser == {}) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="HomePage">
      <NavBar style={{ position: "sticky" }} history={history} />
      <h1>Home</h1>
      <h2>Welcome {currentUser.username}</h2>
      <button onClick={signOut}>Sign out</button>
      <Album props={currentListings} />
    </div>
  );
}

export default HomePage;
