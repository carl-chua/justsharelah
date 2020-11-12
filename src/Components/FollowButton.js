import {
  Button,
} from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../API/Users";

const useStyles = makeStyles({
  buttonPrimary: {
    backgroundColor: "#CC7F5D",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },

});

export default function FollowButton({ user, userId }) {
  const styles = useStyles();

  const currentUser = useSelector((state) => state.currentUser);

  const userToken = useSelector((state) => state.userToken);


  async function handleFollow(e) {
    e.stopPropagation()
    e.preventDefault()
    console.log("clicked");
    var result = await followUser(userToken, userId);
    console.log("FOLLOWED? : " + result);
  }

  async function handleUnfollow(e) {
    e.stopPropagation()
    e.preventDefault()
    console.log("unfollowing");
    var result = await unfollowUser(userToken, userId);
  }

  return user.username != currentUser.username ? (
    user.followers == null || !user.followers.includes(userToken) ? (
      <Button
        size="small"
        className={styles.buttonPrimary}
        onClick={handleFollow}
      >
        <span style={{ color: "white" }}>Follow</span>
      </Button>
    ) : (
      <Button
        size="small"
        className={styles.buttonPrimary}
        onClick={handleUnfollow}
      >
        <span style={{ color: "white" }}>Unfollow</span>
      </Button>
    )
  ) : null;
}

/*
                <Modal
                open={showFollowingModal}
                onClose={isFollowingModal(false)}
            >
                <UserList dataList = {null} title = {"Following"}/>
            </Modal>
            */
