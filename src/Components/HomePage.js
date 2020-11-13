import React from "react";
import firebase from "../API/Firebase";
import { loadUser } from "../API/CurrentUser";
import {
  getAllListings,
  getUserListing2,
  searchListings,
} from "../API/Listings";
import { Redirect } from "react-router";
import ListingList from "./ListingList";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signOut as logOut } from "../Redux/actions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {},
  root: {
    paddingTop: "2%",
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "5%",
    marginBottom: "1%",
  },
  tabText: {
    fontSize: 25,
    fontWeight: "400",
  },
  tabDivider: {
    fontWeight: "lighter",
    fontSize: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
});

function HomePage({ history }) {
  const currentUser = useSelector((state) => state.currentUser);
  const styles = useStyles();

  const [allListings, setAllListings] = React.useState([]);
  const [followingListings, setFollowingListings] = React.useState([]);
  const [view, setView] = React.useState(1);

  console.log("IN HOME PAGE: " + JSON.stringify(currentUser));

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  React.useEffect(() => {
    getAllListings().then((querySnapshot) => {
      var temp = [];
      querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
      setAllListings(temp);
    });
  }, []);

  async function getFollowingListing(setFollowingListings) {
    var temp = [];
    var uId;
    for (uId of currentUser.following) {
      await getUserListing2(uId).then((querySnapshot) => {
        querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
      });
    }
    setFollowingListings(temp);
  }

  React.useEffect(() => {
    if (!isEmpty(currentUser)) {
      getFollowingListing(setFollowingListings);
    }
  }, []);

  if (currentUser == {}) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="HomePage">
      <h1>Home</h1>
      <h2>Welcome {currentUser && currentUser.username}</h2>
      <div className={styles.tabBar}>
        <Button onClick={() => setView(1)}>
          <span
            className={styles.tabText}
            style={
              view === 1
                ? { textDecorationLine: "underline", fontWeight: "bold" }
                : {}
            }
          >
            All
          </span>
        </Button>
        <span className={styles.tabDivider}>{"|"}</span>
        <Button onClick={() => setView(2)}>
          <span
            className={styles.tabText}
            style={
              view === 2
                ? { textDecorationLine: "underline", fontWeight: "bold" }
                : {}
            }
          >
            FOLLOWING
          </span>
        </Button>
      </div>
      {view == 1 ? (
        <ListingList colSize={3} dataList={allListings} />
      ) : (
        <ListingList colSize={3} dataList={followingListings} />
      )}
    </div>
  );
}

export default HomePage;
