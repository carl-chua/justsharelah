import React from "react";
import firebase from "../API/Firebase";
import { loadUser } from "../API/CurrentUser";
import { getAllListingsListener, getAllListings} from "../API/Listings";
import Album from "./Album";

function HomePage() {
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

  React.useEffect(() => (
    loadCurrentListings()
  ));
  
  return (
    <div className="HomePage">
      <h1>Home</h1>
      <h2>Welcome {currentUser.username}</h2>
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      <Album props = {currentListings} />
    </div>
  );
}

export default HomePage;
