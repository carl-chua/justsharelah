import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import SearchSideBar from "../Components/SearchSideBar";
import Album from "../Components/Album";
import UserSearchResult from "../Components/UserSearchResult";
import { getAllListings, searchListings } from "../API/Listings";
import { getAllUsers } from "../API/Users";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/SearchResultsPage.css";
import ListingSearchResult from "../Components/ListingSearchResult";

function SearchResultsPage({ history }) {
  const [searchString, setSearchString] = useState(
    useSelector((state) => state.searchString)
  );
  const [filter, setFilter] = useState("ALL");
  const [listingResults, setListingResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    getAllUsers().then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
      setUserResults(
        temp.filter(function (e) {
          return e[1].username
            .toLowerCase()
            .includes(searchString.toLowerCase());
        })
      );
    });
  }, []);

  useEffect(() => {
    getAllListings().then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
      setListingResults(
        temp.filter(function (e) {
          return e[1].title.toLowerCase().includes(searchString.toLowerCase());
        })
      );
    });
  }, []);

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
        <div className="Results">
          <div className="UserResults">
            {filter == "ALL" || filter == "USERS" ? (
              <UserSearchResult users={userResults} />
            ) : (
              ""
            )}
          </div>
          <div className="ListingResults">
            {filter == "ALL" || filter == "LISTINGS" ? (
              <ListingSearchResult colSize={3} dataList={listingResults} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
