import React from "react";
import firebase from "../API/Firebase";
import { loadUser } from "../API/CurrentUser";
import Album from "./Album";

function HomePage() {
  const [currentUser, setCurrentUser] = React.useState({});

  function loadCurrentUser() {
    loadUser(setCurrentUser);
  }

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <div className="HomePage">
      <h1>Home</h1>
      <h2>Welcome {currentUser.username}</h2>
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      <Album/>
    </div>
  );
}

export default HomePage;
