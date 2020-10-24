import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { GiftedChat } from "react-web-gifted-chat";
import firebase from "firebase";
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

function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    loadMessages();
  });

  function loadMessages() {}

  function renderChat() {
    return (
      <GiftedChat
        user={this.chatUser}
        messages={messages.slice().reverse()}
        onSend={(messages) => this.onSend(messages)}
      />
    );
  }
}
