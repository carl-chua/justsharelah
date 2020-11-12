import React from "react";
import { GridList, Box } from "@material-ui/core";
import ListingCard from "./ListingCard";
import "../Styles/ListingSearchResult.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  listingList: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    overflow: "auto",
    paddingLeft: "2.5%",
  },
  noListText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    color: "grey",
  },
});

export default function CategoryCard({ colSize, dataList }) {
  const styles = useStyles();
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  console.log(colSize);
  console.log(dataList);

  return (
    <div className="ListingSearchResult">
      <h1>Listings</h1>
      <GridList
        cols={colSize}
        className={styles.listingList}
        style={{
          justifyContent: `${isNotSmallScreen ? "start" : "center"}`,
        }}
      >
        {dataList.map((data) => (
          <ListingCard key={data[0]} data={data[1]} />
        ))}
      </GridList>
      {dataList.length == 0 ? <p>No such listing found!</p> : ""}
    </div>
  );
}
