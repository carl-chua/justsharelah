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
    width: "98%",
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

export default function NotificationItem({ notification }) {
  const styles = useStyles();
  const history = useHistory();

  return (
    <div
      className="NotificationItem"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card borderBottom={1} className={styles.root}>
        <CardActionArea>
          <CardContent>
            <Box display="flex" flexDirection="row" alignItems="center">
              <span>{notification.message}</span>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
