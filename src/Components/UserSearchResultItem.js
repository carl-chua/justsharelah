import {
  Avatar,
  Card,
  Box,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

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
  const history = useHistory();

  const linkString = "/user/" + user.username;

  return (
    <Link to={linkString} style={{ textDecoration: "none" }}>
      <div className="UserSearchResultItem">
        <Card borderBottom={1} className={styles.root}>
          <CardActionArea>
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
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Link>
  );
}
