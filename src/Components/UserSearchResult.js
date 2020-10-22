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
    minWidth: 250,
    textAlign: "start",
    marginBottom: "0.2%",
    borderBottom: "5",
  },
});

export default function UserSearchResult({ users }) {
  const styles = useStyles();

  return (
    <div className="UserSearchResult">
      <h1>Users</h1>
      <Box display="flex" flexDirection="column">
        {users.map((data) => (
          <UserSearchResultItem key={data} user={data} />
        ))}
      </Box>
    </div>
  );
}
