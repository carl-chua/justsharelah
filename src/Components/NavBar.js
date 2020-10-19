import React, { useState } from "react";
import firebase from "../API/Firebase";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "../Styles/NavBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

function NavBar({ history }) {
  const [searchString, setSearchString] = useState("");

  const classes = useStyles();

  function handleSearch() {
    if (firebase.auth().currentUser != null) {
      if (searchString != null || searchString != "") {
        alert(`Submitting search string ${searchString}`);
      }
    } else {
      history.push("/login");
    }
  }

  function handleClickOnName() {
    if (firebase.auth().currentUser != null) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="NavBar">
      <div className="NavBarTop">
        <button onClick={handleClickOnName} className="Name">
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
