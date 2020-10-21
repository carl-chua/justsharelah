import React, { useState } from "react";
import firebase from "../API/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { reduxSetSearchString } from "../Redux/actions";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SearchIcon from "@material-ui/icons/Search";
import "../Styles/NavBar.css";

function NavBar({ history }) {
  const [searchString, setSearchString] = useState(
    useSelector((state) => state.searchString)
  );

  const dispatch = useDispatch();

  function handleSearch() {
    if (firebase.auth().currentUser != null) {
      if (searchString != null && searchString != "") {
        dispatch(reduxSetSearchString(searchString));
        history.push("/search");
      }
    } else {
      history.push("/login");
    }
  }

  function handleClickOnName() {
    if (firebase.auth().currentUser != null) {
      history.push("/");
      alert("Clicked on name!");
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="NavBar">
      <div className="NavBarTop">
        <button type="button" onClick={handleClickOnName} className="Name">
          JustShareLah!
        </button>
        <form onSubmit={handleSearch}>
          <div className="InputGroup">
            <input
              type="text"
              value={searchString}
              placeholder="Search for item or user..."
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </div>
        </form>
        <div className="SideButtons">
          <button>
            <ChatBubbleOutlineRoundedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </button>

          <button>
            <LocalMallOutlinedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </button>

          <button>
            <PersonOutlineIcon style={{ color: "white" }} fontSize="large" />
          </button>
        </div>
      </div>
      <div className="NavBarBottom">
        <div className="CategoryButtons">
          <button>APPAREL</button>
          <button>ELECTRONICS</button>
          <button>ACCESSORIES</button>
          <button>EDUCATION</button>
          <button>BEAUTY</button>
          <button>LIVING</button>
          <button>BABIES & KIDS</button>
        </div>
        <button className="UploadListing">UPLOAD LISTING</button>
      </div>
    </div>
  );
}

export default NavBar;
