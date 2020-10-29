import React, { useState } from "react";
import firebase from "../API/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { reduxSetSearchString } from "../Redux/actions";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

import "../Styles/NavBar.css";
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

function NavBar() {
  const [searchString, setSearchString] = useState(
    useSelector((state) => state.searchString)
  );

  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.userToken);
  const currentUser = useSelector((state) => state.currentUser);
  
  const history = useHistory();

  React.useEffect(() => {
    if (userToken != null && currentUser != null) {
      console.log("LOGGED IN USERID: " + userToken);
      console.log(
        "LOGGED IN USERNAME: " + JSON.stringify(currentUser.username)
      );
    }
  }, [userToken, currentUser]);

  function handleSearch() {
    if (firebase.auth().currentUser != null) {
      if (searchString != null && searchString != "") {
        history.push("/search");
      }
    } else {
      history.push("/login");
    }
  }

  function handleClickOnName() {
    if (firebase.auth().currentUser != null && currentUser != null) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }

  function handleProfileClick() {
    if (firebase.auth().currentUser != null && currentUser != null) {
      history.push(`/user/${currentUser.username}`);
    } else {
      history.push("/login");
    }
  }

  function handleChatClick() {
    if (firebase.auth().currentUser != null && currentUser != null) {
      history.push(`/chat/${currentUser.username}`);
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
              onChange={(e) => {
                setSearchString(e.target.value);
                dispatch(reduxSetSearchString(e.target.value));
              }}
            />
            <button
              disabled={searchString == null || searchString == ""}
              type="submit"
            >
              <SearchIcon />
            </button>
          </div>
        </form>
        <div className="SideButtons">
          <IconButton onClick={() => handleChatClick()}>
            <ChatBubbleOutlineRoundedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </IconButton>

          <IconButton>
            <LocalMallOutlinedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </IconButton>

          <IconButton onClick={() => handleProfileClick()}>
            <PersonOutlineIcon style={{ color: "white" }} fontSize="large" />
          </IconButton>
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
