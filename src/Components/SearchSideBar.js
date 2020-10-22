import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "../../node_modules/react-pro-sidebar/dist/css/styles.css";
import "../Styles/SearchSideBar.css";
import "../Styles/SearchSideBarCustom.scss";
import { useSelector, useDispatch } from "react-redux";

function SearchSideBar({ filter, setFilter, searchString }) {
  function handleChangeFilterToAll() {
    if (filter != "ALL") {
      setFilter("ALL");
    }
  }

  function handleChangeFilterToUsers() {
    if (filter != "USERS") {
      setFilter("USERS");
    }
  }

  function handleChangeFilterToListings() {
    if (filter != "LISTINGS") {
      setFilter("LISTINGS");
    }
  }

  return (
    <div className="SearchSideBar">
      <ProSidebar>
        <div className="Top">
          <h2>Search results for</h2>
          <div className="SearchString">
            <p>{searchString}</p>
          </div>
          <div className="SeperatorDiv">
            <hr className="Seperator" />
          </div>
          <h3>Filters</h3>
        </div>
        <div className="Bottom">
          <Menu>
            <div onClick={handleChangeFilterToAll}>
              <MenuItem active={filter == "ALL"}>All</MenuItem>
            </div>
            <div onClick={handleChangeFilterToUsers}>
              <MenuItem active={filter == "USERS"}>Users</MenuItem>
            </div>
            <div onClick={handleChangeFilterToListings}>
              <MenuItem active={filter == "LISTINGS"}>Listings</MenuItem>
            </div>
          </Menu>
        </div>
      </ProSidebar>
    </div>
  );
}

export default SearchSideBar;
