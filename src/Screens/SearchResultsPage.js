import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import SearchSideBar from "../Components/SearchSideBar";

function SearchResultsPage() {
  const [filter, setFilter] = useState("ALL");

  return (
    <div className="SearchResultsPage">
      <NavBar />
      <SearchSideBar filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default SearchResultsPage;
