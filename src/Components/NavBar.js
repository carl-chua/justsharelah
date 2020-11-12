import React, { useState } from "react";
import firebase from "../API/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { reduxSetSearchString, signOut } from "../Redux/actions";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import ChatTwoToneIcon from "@material-ui/icons/ChatTwoTone";
import AccountBalanceWalletTwoToneIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";

import "../Styles/NavBar.css";
import { useHistory } from "react-router";
import { getUserById, getUserByIdListener } from "../API/Users";
import { AccountCircle } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthContext } from "../Auth";

import { currentUser as currUser } from "../Redux/actions";

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

  //const currentUser = useSelector((state) => state.currentUser);

  const [currentUser, setCurrentUser] = React.useState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const unsubscribe = getUserByIdListener(userToken, setCurrentUser);

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (currentUser) {
      dispatch(currUser(currentUser));
    }
  }, [currentUser]);

  const history = useHistory();

  const { signOut } = React.useContext(AuthContext);

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
    handleMenuClose();
  }

  function handleChatClick() {
    if (firebase.auth().currentUser != null && currentUser != null) {
      history.push(`/chat/${currentUser.username}`);
    } else {
      history.push("/login");
    }
  }

  function handleWalletClick() {
    if (firebase.auth().currentUser != null && currentUser != null) {
      history.push("/myWallet");
    } else {
      history.push("/login");
    }
  }

  async function handleSignOut(e) {
    e.preventDefault();
    await signOut();
    history.push("/login");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>My Profile</p>
      </MenuItem>
      <MenuItem onClick={handleSignOut}>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

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
          {/*<IconButton onClick={() => handleChatClick()}>
            <ChatBubbleOutlineRoundedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </IconButton>

          <IconButton onClick={handleWalletClick}>
            <LocalMallOutlinedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </IconButton>

          <IconButton onClick={handleProfileMenuOpen}>
            <PersonOutlineIcon style={{ color: "white" }} fontSize="large" />
            </IconButton>*/}
          <IconButton onClick={() => handleChatClick()}>
            <ChatTwoToneIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={handleWalletClick}>
            <AccountBalanceWalletTwoToneIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={() => handleProfileClick()}>
            <PersonOutlineTwoToneIcon fontSize="large" />
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
      {renderMenu}
    </div>
  );
}

export default NavBar;
