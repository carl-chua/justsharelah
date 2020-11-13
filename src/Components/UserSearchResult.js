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
import UserSearchResultItem from "./UserSearchResultItem";
import "../Styles/UserSearchResult.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "start",
    marginBottom: "0.2%",
    borderBottom: "5",
  },
  noUserText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    color: "grey",
  },
});

export default function UserSearchResult({ users }) {
  const styles = useStyles();

  return (
    <div className="UserSearchResult">
      <h1>Users</h1>
      {users && users.length > 0 ? (
        <Box display="flex" flexDirection="column">
          {users.map((data) => (
            <UserSearchResultItem key={data[0]} user={data[1]} />
          ))}
        </Box>
      ) : (
        <p>No users found!</p>
      )}
    </div>
  );
}
