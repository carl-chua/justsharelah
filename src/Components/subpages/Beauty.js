import React, { useState, useEffect } from "react";

import { getAllListings } from "../../API/Listings";


import "../../Styles/SearchResultsPage.css";
import CategoryCard from "../CategoryCard";


function CategoryResultsPage() {
    
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
    <div className="SearchResultsPage">
        {<CategoryCard colSize={3} dataList={listingResults} />}
    </div>
  );
}

export default CategoryResultsPage;
