import { Grid, Box, Button, Modal, Card } from "@material-ui/core";
import React from "react";

import UserCard from "../Components/UserCard";
import { makeStyles } from "@material-ui/core/styles";

import ListingList from "../Components/ListingList";
import { getUserByUsername, getUserByUsernameListener } from "../API/Users";
import { useParams } from "react-router";
import ReviewList from "../Components/ReviewList";
import Loading from "../Components/Loading";
import FollowModal from "../Components/FollowModal";
import { getUserListing, getUserListingListener } from "../API/Listings";
import { useSelector } from "react-redux";
import CreateReviewModal from "../Components/CreateReviewModal";
import { getReviews, getReviewsListener } from "../API/Reviews";

const useStyles = makeStyles({
    root : {
        display : "flex",
        marginTop : "2%",
        marginLeft : "5%",
        marginRight : "5%",
    },
    tabContainer : {
        height: "80%", 
        overflow: "auto",
        borderRadius : 16,
        borderColor : "#BEBEBE",
    },
    lowerCase : {
        fontSize: 26,
        textTransform : 'none',
    },
    tabBar : {
        justifyContent : "flex-start",
        alignItems : "center",
        textAlign : "start",
    },
    tabHeaderText : {
        textAlign : "start",
        fontSize : 36,
        fontWeight : "bold",
        paddingLeft : "5%"
    },                       
    listingList : {
        display : "flex",
        flexWrap : "wrap",
        overflow : "auto",
        paddingLeft : "2.5%"
    },
    noListText : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        height : "80%",
        color : "grey",
    },
    tabContainerTitle : {
        display: "flex", 
        flexDirection : "row", 
        justifyContent: "space-between", 
        width : "100%", 
        alignItems : "center",
    },
    button: {
        backgroundColor: "#CC7F5D",
        color: "white",
        width: "10vw",
        minHeight: "6vh",
        marginTop: "10%",
    }
});

export default function UserPage({ history }) {
  const styles = useStyles();

  const [view, setView] = React.useState(1);

  const [user, setUser] = React.useState();

  let { username } = useParams();

  const currentUser = useSelector((state) => state.currentUser);

  const [showFollowingModal, setShowFollowingModal] = React.useState(false);
  const [showFollowersModal, setShowFollowersModal] = React.useState(false);

  const [userListing, setUserListing] = React.useState([]);
  const [userReview, setUserReview] = React.useState([]);

  const [userExists, setUserExists] = React.useState(true);

  const userToken = useSelector((state) => state.userToken);

  const [showReviewModal, setShowReviewModal] = React.useState(false);

  function openFollowingModal() {
    setShowFollowingModal(true);
  }

  function closeFollowingModal() {
    setShowFollowingModal(false);
  }

  function openFollowersModal() {
    setShowFollowersModal(true);
  }

  function closeFollowersModal() {
    setShowFollowersModal(false);
  }

  function openReviewModal() {
    setShowReviewModal(true);
  }

  function closeReviewModal() {
    setShowReviewModal(false);
  }

  React.useEffect(() => {
    setUser(null);
    setUserExists(true);
    async function fetchData() {
      setUserExists(await getUserByUsername(username, setUser));
    }
    fetchData();
  }, [username]);

  React.useEffect(() => {
    setUser(null);
    setUserExists(true);
    const unsubscribe = getUserByUsernameListener(username, setUser);

    return unsubscribe;
  }, [username]);

  React.useEffect(() => {
    if (user) {
      const unsubscribe = getUserListingListener(user[0], setUserListing);

      return unsubscribe;
    } else {
      setUserListing([]);
    }
  }, [user]);

  React.useEffect(() => {
    if (user) {
      const unsubscribe = getReviewsListener(user[0], setUserReview);

      return unsubscribe;
    } else {
      setUserReview([]);
    }
  }, [user]);

  React.useEffect(() => {
    if (userReview.length > 0) {
      setUserReview(
        userReview.sort((a, b) => b[1].date.toDate() - a[1].date.toDate())
      );
    }


  },[userReview])

  function handleEditProfile() {
    console.log("GOING TO EDIT PROFILE:");
    history.push(`/settings`);
  }

  return user ? (
    <Box className={styles.root}>
      <Grid
        container
        direction-xs-column="true"
        justify="center"
        direction="row"
        spacing={5}
      >
        <Grid item xs={12} md={3}>
          <Box display="flex" justifyContent="center" alignContent="center">
            <UserCard
              user={user[1]}
              userId={user[0]}
              openFollowersModal={openFollowersModal}
              openFollowingModal={openFollowingModal}
              reviews={userReview}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box className={styles.tabBar}>
            <Button size="small" onClick={() => setView(1)}>
              <span
                className={styles.lowerCase}
                style={view === 1 ? { textDecorationLine: "underline" } : {}}
              >
                Listings
              </span>
            </Button>
            <Button size="small" onClick={() => setView(2)}>
              <span
                className={styles.lowerCase}
                style={view === 2 ? { textDecorationLine: "underline" } : {}}
              >
                Reviews
              </span>
            </Button>
          </Box>
          <Box
            m={1}
            border={1}
            bgcolor="background-paper"
            className={styles.tabContainer}
          >
            <div className={styles.tabContainerTitle}>
              <p className={styles.tabHeaderText}>
                {view === 1 && "Listings"}
                {view === 2 && "Reviews"}
              </p>
              {view == 2 && userToken != user[0] && (
                <Button
                  size="small"
                  style={{ height: "1%", marginRight: "2%" }}
                  onClick={openReviewModal}
                >
                  <span style={{ fontSize: 30 }}>+</span>
                </Button>
              )}
            </div>

            {view === 1 && <ListingList dataList={userListing} colSize={3} />}
            {view === 2 && <ReviewList dataList={userReview} />}
          </Box>
        </Grid>
      </Grid>

      <FollowModal
        dataList={user[1].following}
        title="Following"
        show={showFollowingModal}
        handleClose={closeFollowingModal}
      />
      <FollowModal
        dataList={user[1].followers}
        title="Followers"
        show={showFollowersModal}
        handleClose={closeFollowersModal}
      />
      <CreateReviewModal
        show={showReviewModal}
        handleClose={closeReviewModal}
        user={user}
      />
    </Box>
  ) : userExists ? (
    <Loading />
  ) : (
    <div
      className={styles.root}
      style={{ justifyContent: "center", alignItems: "center", height: "80vh" }}
    >
      <p>User {username} does not exist!</p>
    </div>
  )
}
