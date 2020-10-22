import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import SearchSideBar from "../Components/SearchSideBar";
import Album from "../Components/Album";
import UserSearchResult from "../Components/UserSearchResult";
import { getAllListings, searchListings } from "../API/Listings";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/SearchResultsPage.css";

function SearchResultsPage({ history }) {
  const [searchString, setSearchString] = useState(
    useSelector((state) => state.searchString)
  );
  const [filter, setFilter] = useState("ALL");
  const [listingResults, setListingResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

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

  const user1 = {
    username: "Max",
    numListings: 5,
    location: "Singapore",
  };
  const user2 = {
    username: "Natalie",
    numListings: 10,
    location: "Singapore",
  };
  const users = [user1, user2];

  return (
    <div className="SearchResultsPage">
      <NavBar history={history} />
      <div className="Content">
        <div className="SearchSideBar">
          <SearchSideBar
            searchString={searchString}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <div className="UserResults">
          <UserSearchResult users={users} />
        </div>
        <div className="ListingResults">
          <Album listings={listingResults} />
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
