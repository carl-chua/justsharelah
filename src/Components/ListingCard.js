import {
  Card,
  Box,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";

import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    height: 450,
    minWidth: 250,
    width: `${80 / 3}%`,
    textAlign: "start",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginBottom: "5%",
    borderBottom: "3",
  },
  mainText: {
    fontSize: 25,
    margin: 0,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 20,
    color: "gray",
    paddingTop: 5,
    paddingBottom: 5,
    margin: 0,
  },
  desText: {
    fontSize: 16,
    color: "gray",
    margin: 0,
  },
});

export default function ListingCard({ key, data }) {
  const styles = useStyles();

  const history = useHistory()

  function handleNavigate() {
    history.push(`/listingDetails/${data[0]}`)
  }

  return (
    data[1] ?
    <Card className={styles.root}>
      <CardActionArea onClick={handleNavigate}>
        <CardMedia
          component="img"
          src="https://images.unsplash.com/photo-1596650956793-68f12df4e549?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2980&q=80"
          style={{
            height: 250,
          }}
        />
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 170,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <text className={styles.mainText}>
                {data[1].title.substr(0, 20)}
              </text>
              <text className={styles.subText}>
                Min target : S${data[1].targetAmount}
              </text>
              <text className={styles.desText}>
                {data[1].description.length < 70
                  ? data[1].description
                  : data[1].description.substr(0, 70) + "..."}
              </text>
            </div>
            <div
              className={styles.desText}
              style={{
                color: "black",
              }}
            >
              {data[1].members ? data[1].members.length : 0} Kuppers
            </div>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
    : null
  );
}
