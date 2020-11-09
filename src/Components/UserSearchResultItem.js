import {
  Avatar,
  Card,
  Box,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    width: "100%",
    textAlign: "start",
    marginBottom: "1%",
    borderBottom: "5",
    borderLeft: "none",
    borderRight: "none",
    backgroundColor: "white",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  mainText: {
    fontSize: 25,
    margin: 0,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 20,
    color: "black",
    margin: 0,
    paddingLeft: 10,
  },
  desText: {
    fontSize: 16,
    color: "black",
    margin: 0,
    paddingLeft: 10,
  },
});

export default function UserSearchResultItem({ user }) {
  const styles = useStyles();

  return (
    <div className="UserSearchResultItem">
      <Card borderBottom={1} className={styles.root}>
        <CardActionArea onClick={() => console.log("clicked listingcard")}>
          <CardContent>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Avatar
                src={user.imageUrl}
                style={{
                  width: 60,
                  height: 60,
                }}
              >
                <span style={{ fontSize: "150%" }}>
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </Avatar>
              <Box display="flex" flexDirection="column">
                <p className={styles.nameText}>{user.username}</p>
                <p className={styles.desText}>{user.country}</p>
                <p className={styles.desText}>
                  {user.listingsAsOP ? user.listingsAsOP.length : 0} Listings created
                </p>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
