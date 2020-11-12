import React from "react";
import firebase from "../API/Firebase";
import { loadUser } from "../API/CurrentUser";
import { searchListings } from "../API/Listings";
import { Redirect } from "react-router";
import ListingList from "./ListingList";
import { useDispatch, useSelector } from "react-redux";

import { signOut as logOut } from "../Redux/actions";

function HomePage({ history }) {
  const currentUser = useSelector(state => state.currentUser)
  const [currentListings, setListings] = React.useState([]);

  const dispatch = useDispatch();

  console.log("IN HOME PAGE: " + JSON.stringify(currentUser))

  React.useEffect(() => {
    searchListings(null, 9).then((querySnapshot) => {
      var temp = [];
      querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
      setListings(temp);
    });
  }, []);

  if (currentUser == {}) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="HomePage">
      <h1>Home</h1>
      <h2>Welcome {currentUser && currentUser.username}</h2>
      <ListingList colSize={3} dataList={currentListings} />
    </div>
  );
}

export default HomePage;