import {
  Avatar,
  Card,
  Box,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";

import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { getUserById, getUserByUsername } from "../API/Users";

import Rating from "@material-ui/lab/Rating";

import moment from "moment";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    width: `100%`,
    textAlign: "start",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginBottom: "1%",
    borderBottom: "5",
  },
  mainText: {
    fontSize: 25,
    margin: 0,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 20,
    color: "gray",
    margin: 0,
    paddingLeft: 10,
  },
  desText: {
    fontSize: 16,
    color: "gray",
    margin: 0,
  },
});

export default function UserListCard({ data, handleClose }) {
  const styles = useStyles();
  const [user, setUser] = React.useState();

  let history = useHistory()

  React.useEffect(() => {
    getUserById(data, setUser);
  }, []);

  function handleOnPress() {
    if(handleClose) {
      handleClose();
    }
    history.push(`/user/${user.username}`);
    //history.push("/")
  }

  return user ? (
    <Card className={styles.root}>
      <CardActionArea onClick={handleOnPress}>
      <CardContent>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Avatar
            src={user.imageUrl}
            style={{
              width: 45,
              height: 45,
            }}
          >
            <span style={{ fontSize: "100%" }}>
              {user.username.charAt(0).toUpperCase()}
            </span>
          </Avatar>
          <p className={styles.nameText}>{user.username}</p>
        </Box>
      </CardContent>
      </CardActionArea>
    </Card>
  ) : null;
}
