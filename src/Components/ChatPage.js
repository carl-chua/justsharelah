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

  const userToken = useSelector((state) => state.userToken);
  const currentUser = useSelector((state) => state.currentUser);

  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);

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

  const chatUser = {
    id: userToken,
    name: currentUser.username,
    avatar: currentUser.photo,
  };

  useEffect(() => {
    getChatGroups(userToken).then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc) => temp.push([doc.id, doc.data()]));
      setChatGroups(temp);
      if (temp.length != 0) {
        setSelectedChat(temp[0]);
      }
    });
  }, []);

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
                showCreateOrderModal={showCreateOrderModal}
                openCreateOrderModal={openCreateOrderModal}
                closeCreateOrderModal={closeCreateOrderModal}
                showEditOrderModal={showEditOrderModal}
                openEditOrderModal={openEditOrderModal}
                closeEditOrderModal={closeEditOrderModal}
              />
              <CreateOrderModal
                show={showCreateOrderModal}
                handleClose={closeCreateOrderModal}
                listingId={selectedChat[1].listing}
              />
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
