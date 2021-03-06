import React, { Component, useState, useEffect } from "react";
import { GiftedChat } from "react-web-gifted-chat";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import ChatBox from "./ChatBox";
import { getChatGroups } from "../API/Chat";
import "../Styles/Chat.css";
import Loading from "./Loading";
import CreateOrderModal from "../Components/CreateOrderModal";
import { getOrderRecordByListingIdAndUserId } from "../API/OrderRecord";
import { getListingById } from "../API/Listings";
import EditOrderModal from "./EditOrderModal";
import WithdrawOrderModal from "./WithdrawOrderModal";
import firebase from "../API/Firebase";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 95px)",
  },
  channelList: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#7AA18A",
    width: "350px",
    height: "calc(100vh - 95px)",
  },
  channelItemActive: {
    backgroundColor: "#7A9AA1",
  },
  channelText: {
    color: "white",
  },
  chat: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    borderWidth: "1px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
  },
  settings: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
};

function Chat({ history }) {
  const [chatGroups, setChatGroups] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [selectedListing, setSelectedListing] = useState({});
  const [chatUser, setChatUser] = useState({});

  const userToken = useSelector((state) => state.userToken);
  const currentUser = useSelector((state) => state.currentUser);

  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [showWithdrawOrderModal, setShowWithdrawOrderModal] = useState(false);

  const [orderRecord, setOrderRecord] = useState();

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  function openCreateOrderModal() {
    setShowCreateOrderModal(true);
  }

  function closeCreateOrderModal() {
    setShowCreateOrderModal(false);
  }

  function openEditOrderModal() {
    setShowEditOrderModal(true);
  }

  function closeEditOrderModal() {
    setShowEditOrderModal(false);
  }

  function openWithdrawOrderModal() {
    setShowWithdrawOrderModal(true);
  }

  function closeWithdrawOrderModal() {
    setShowWithdrawOrderModal(false);
  }

  useEffect(() => {
    getChatGroups(userToken).then(function (querySnapshot) {
      let temp = [];

      async function fetch(temp) {
        const storageRef = firebase.storage().ref();
        querySnapshot.forEach(function (doc) {
          try {
            var photoRef = storageRef.child("image").child(doc.data().photo);
            photoRef
              .getDownloadURL()
              .then(function (url) {
                var chatGroup = {
                  ...doc.data(),
                  photo: url,
                };
                temp.push([doc.id, chatGroup]);
              })
              .then(() => {
                setChatGroups(temp);
                if (temp.length !== 0) {
                  setSelectedChat(temp[0]);
                }
              });
          } catch (err) {
            console.log(err);
          }
        });
      }
      fetch(temp);
    });
  }, []);

  /*useEffect(() => {
    if (chatGroups.length !== 0) {
      setSelectedChat(chatGroups[0]);
    }
  },[chatGroups])*/

  useEffect(() => {
    if (userToken && currentUser) {
      try {
        const storageRef = firebase.storage().ref();
        var photoRef = storageRef.child("image").child(currentUser.imageUrl);
        photoRef.getDownloadURL().then(function (url) {
          setChatUser({
            id: userToken,
            name: currentUser.username,
            avatar: url,
          });
        });
      } catch (err) {
        setChatUser({
          id: userToken,
          name: currentUser.username,
          avatar: null,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (selectedChat.length !== 0 && !isEmpty(chatUser)) {
      getOrderRecordByListingIdAndUserId(
        selectedChat[1].listing,
        chatUser.id
      ).then((querySnapshot) => {
        var temp = [];
        querySnapshot.forEach((doc) => (temp = [doc.id, doc.data()]));
        setOrderRecord(temp);
      });
    }
  }, [
    selectedChat,
    showCreateOrderModal,
    showEditOrderModal,
    showWithdrawOrderModal,
  ]);

  useEffect(() => {
    if (selectedChat.length !== 0) {
      getListingById(selectedChat[1].listing).then((querySnapshot) => {
        if (querySnapshot) {
          var temp = {};
          temp = querySnapshot.data();
          setSelectedListing(temp);
        }
      });
    }
  }, [selectedChat]);

  async function handleChangeChat(data) {
    setSelectedChat(data);
  }

  function renderChannelsHeader() {
    return (
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Groups
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  function renderChannels() {
    return (
      <List>
        {chatGroups.map((data) => (
          <div key={data[0]} onClick={() => handleChangeChat(data)}>
            <ListItem
              key={data[0]}
              button
              style={selectedChat === data ? styles.channelItemActive : null}
            >
              <ListItemAvatar>
                <Avatar src={data[1].photo}>
                  <span>{data[1].groupName.charAt(0).toUpperCase()}</span>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={styles.channelText}
                primary={data[1].groupName}
              />
            </ListItem>
          </div>
        ))}
      </List>
    );
  }

  return (
    <div className="Chat">
      <div style={styles.container}>
        <div className="ChannelList" style={styles.channelList}>
          {renderChannelsHeader()}
          {renderChannels()}
        </div>
        <div style={styles.chat}>
          {selectedChat.length != 0 ? (
            <>
              <ChatBox
                selectedChat={selectedChat}
                chatUser={chatUser}
                orderRecord={orderRecord}
                selectedListing={selectedListing}
                openCreateOrderModal={openCreateOrderModal}
                openEditOrderModal={openEditOrderModal}
                openWithdrawOrderModal={openWithdrawOrderModal}
              />
              <CreateOrderModal
                show={showCreateOrderModal}
                handleClose={closeCreateOrderModal}
                listingId={selectedChat[1].listing}
              />
              <EditOrderModal
                show={showEditOrderModal}
                handleClose={closeEditOrderModal}
                orderRecord={orderRecord}
              />
              <WithdrawOrderModal
                show={showWithdrawOrderModal}
                handleClose={closeWithdrawOrderModal}
                orderRecord={orderRecord}
              />
            </>
          ) : (
            <h3
              style={{
                color: "gray",
                textAlign: "center",
                marginLeft: "18%",
              }}
            >
              No messages to show
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
