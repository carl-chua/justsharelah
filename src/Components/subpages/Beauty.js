import React, { useState, useEffect } from "react";
import { Grid, Box} from "@material-ui/core";

import { getAllListings } from "../../API/Listings";
import { makeStyles } from '@material-ui/core/styles';

import CategoryCard from "../CategoryCard";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "3%",
    padding: "1%",
    maxHeight: "75vh", 
    minWidth: "60VW",
    overflow: "auto",
    borderRadius : 16,
    borderColor : "#BEBEBE",
    boxShadow : "-10px 10px 4px rgba(0, 0, 0, 0.05)",
  },
}));

function CategoryResultsPage() {

  const styles = useStyles();
    
  const [listingResults, setListingResults] = useState([]);

  useEffect(() => {
    getAllListings().then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
      setListingResults(
        temp.filter(function (e) {
          return e[1].category.includes('Beauty');
        })
      );
    });
  }, []);

  return (
    
    <Box 
      m = {1}
      border = {1}
      bgcolor = "background-paper"
      className={styles.root}>
        <h1>Beauty</h1>
        {<CategoryCard colSize={3} dataList={listingResults} />}
    </Box>
  );
}

export default CategoryResultsPage;
