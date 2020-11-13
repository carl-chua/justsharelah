import React, { useState } from "react";
import firebase from "../API/Firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  reduxSetSearchString,
  reduxSetCategory,
  signOut,
} from "../Redux/actions";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatTwoToneIcon from "@material-ui/icons/ChatTwoTone";
import AccountBalanceWalletTwoToneIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import { Badge } from "@material-ui/core";

import { Link } from "react-router-dom";

import "../Styles/NavBar.css";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";
import { getUserById, getUserByIdListener } from "../API/Users";
import { AccountCircle } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthContext } from "../Auth";
import {
  notificationListener,
  setAllUserNotificationsAsRead,
} from "../API/Notification";

import { currentUser as currUser } from "../Redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

export default function NavBar() {
  const alert = useAlert();

  const [searchString, setSearchString] = useState(
    useSelector((state) => state.searchString)
  );

  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.userToken);

  //const currentUser = useSelector((state) => state.currentUser);

  const [currentUser, setCurrentUser] = React.useState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [notifications, setNotifications] = React.useState([]);

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  React.useEffect(() => {
    if (!isEmpty(currentUser)) {
      setNotifications([]);
      const unsubscribe = notificationListener(
        setNotifications,
        currentUser.username
      );

      const test = () => {
        return unsubscribe();
      };
      return test;
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (
      notifications.length !== 0 &&
      notifications[notifications.length - 1] !== undefined
    ) {
      alert.show(notifications[notifications.length - 1][1].message);
    }
  }, [notifications]);

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

  function handleEditProfile() {
    if (firebase.auth().currentUser != null && currentUser != null) {
      history.push('/settings');
    } else {
      history.push("/login");
    }
    handleMenuClose();
  }

  function handleCategoryClick(category) {
    if (firebase.auth().currentUser != null) {
      history.push(`/categories/${category}`);
    }
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

  function handleUploadListingClick() {
    if (firebase.auth().currentUser != null && currentUser != null) {
      history.push("/createListing");
    } else {
      history.push("/login");
    }
  }

  async function handleSignOut(e) {
    e.preventDefault();
    await signOut();
    history.push("/login");
  }

  async function handleNotificationClick() {
    await setAllUserNotificationsAsRead(currentUser.username);
    await setNotifications([]);
    history.push("/notifications");
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
      <MenuItem onClick={handleEditProfile}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Edit Profile</p>
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
          <IconButton onClick={() => handleNotificationClick()}>
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsNoneIcon
                style={{ color: "white" }}
                fontSize="large"
              />
            </Badge>
          </IconButton>

          <IconButton onClick={() => handleChatClick()}>
            <ChatBubbleOutlineRoundedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </IconButton>

          <IconButton onClick={handleWalletClick}>
            <AccountBalanceWalletOutlinedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </IconButton>

          <IconButton onClick={handleProfileMenuOpen}>
            <PersonOutlineIcon style={{ color: "white" }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className="NavBarBottom">
        <div className="CategoryButtons">
          <button onClick={() => handleCategoryClick("Apparel")}>
            APPAREL
          </button>
          <button onClick={() => handleCategoryClick("Electronics")}>
            {" "}
            ELECTRONICS
          </button>
          <button onClick={() => handleCategoryClick("Accessories")}>
            {" "}
            ACCESSORIES
          </button>
          <button onClick={() => handleCategoryClick("Education")}>
            EDUCATION
          </button>
          <button onClick={() => handleCategoryClick("Beauty")}>BEAUTY</button>
          <button onClick={() => handleCategoryClick("Living")}>LIVING</button>
          <button onClick={() => handleCategoryClick("Babies&Kids")}>
            BABIES & KIDS
          </button>
          <button onClick={() => handleCategoryClick("Others")}>OTHERS</button>
        </div>
        <button
          className="UploadListing"
          onClick={() => handleUploadListingClick()}
        >
          UPLOAD LISTING
        </button>
      </div>
      {renderMenu}
    </div>
  );
}
