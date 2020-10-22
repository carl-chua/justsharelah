import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import SearchSideBar from "../Components/SearchSideBar";
import Album from "../Components/Album";
import { getAllListings, searchListings } from "../API/Listings";
import { useSelector, useDispatch } from "react-redux";

function SearchResultsPage() {
  const [searchString, setSearchString] = useState(
    useSelector((state) => state.searchString)
  );
  const [filter, setFilter] = useState("ALL");
  const [listingResults, setListingResults] = useState([]);

  useEffect(() => {
    getAllListings().then((querySnapshot) => {
      setListingResults(querySnapshot.docs.map((doc) => doc.data()));
    });
    setListingResults(
      listingResults.filter(function (e) {
        return (
          e.listingTitle.includes(searchString) ||
          e.desc.includes(searchString) ||
          e.location.includes(searchString)
        );
      })
    );
  }, []);

  return (
    <div className="SearchResultsPage">
      <NavBar />
      <SearchSideBar
        searchString={searchString}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="ListingResults">
        <Album listings={listingResults} />
      </div>
    </div>
  );
}

export default SearchResultsPage;
