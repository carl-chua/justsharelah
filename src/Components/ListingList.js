import React from "react";
import { GridList, Box } from "@material-ui/core";
import ListingCard from "./ListingCard";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  listingList: {
    display: "flex",
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

export default function ListingList({ colSize, dataList }) {
  const styles = useStyles();
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));


  return dataList && dataList.length > 0 ? (
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
  ) : (
    <Box className={styles.noListText}>
      <p>User has no Listings</p>
    </Box>
  );
}
