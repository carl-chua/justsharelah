import React from "react";
import firebase from "../API/Firebase";
import { loadUser } from "../API/CurrentUser";
import { searchListings } from "../API/Listings";
import Album from "./Album";
import NavBar from "./NavBar";
import { Redirect } from "react-router";
import ListingCard from "./ListingCard";
import ListingList from "./ListingList";
import { useDispatch } from "react-redux";

import { signOut as logOut } from "../Redux/actions"

function HomePage({ history }) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentListings, setListings] = React.useState([]);

  const dispatch = useDispatch();

  function loadCurrentUser() {
    loadUser(setCurrentUser);
  }

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  React.useEffect(() => {
    searchListings(null, 9).then((querySnapshot) => {
      var temp = [];
      querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
      setListings(temp);
    });
  }, []);

  // testing
  // searchListings(null, 9).then(querySnapshot => {
  //   querySnapshot.docs.map(doc => {
  //     console.log(doc.data());
  //     return [];
  //   });
  // });

  function signOut() {
    firebase.auth().signOut();
    dispatch(logOut());
    history.push("/login");
  }

  if (currentUser == {}) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="HomePage">
      <h1>Home</h1>
      <h2>Welcome {currentUser.username}</h2>
      <button onClick={signOut}>Sign out</button>
      <ListingList colSize={3} dataList={currentListings} />
      {/* <Album header="FOR YOU" listings={currentListings} /> */}
    </div>
  );
}

export default HomePage;