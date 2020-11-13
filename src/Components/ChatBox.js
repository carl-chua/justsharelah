import React, { Component, useState, useEffect } from "react";
import { GiftedChat } from "react-web-gifted-chat";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { sendMessage, messagesListener } from "../API/Chat";
import { getUserByIdForChat } from "../API/Users";
import { DateSeparator } from "stream-chat-react";
import "../Styles/ChatBox.css";
import { useHistory } from "react-router";

const styles = {
  chat: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    borderWidth: "0px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
  },
};

function ChatBox({
  selectedChat,
  chatUser,
  orderRecord,
  selectedListing,
  openCreateOrderModal,
  openEditOrderModal,
  openWithdrawOrderModal,
}) {
  const [messages, setMessages] = useState([]);
  const [tempMessages, setTempMessages] = useState([]);

  const history = useHistory();

  useEffect(() => {
    console.log(selectedChat[0]);

    setTempMessages([]);

    const unsubscribe = messagesListener(selectedChat[0], setTempMessages);

    const test = () => {
      return unsubscribe();
    };
    return test;
  }, [selectedChat]);

  useEffect(() => {
    setMessages(
      tempMessages.sort((m1, m2) => {
        return dates.compare(m1.createdAt, m2.createdAt);
      })
    );
  }, [tempMessages]);

  var dates = {
    convert: function (d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp)
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return d.constructor === Date
        ? d
        : d.constructor === Array
        ? new Date(d[0], d[1], d[2])
        : d.constructor === Number
        ? new Date(d)
        : d.constructor === String
        ? new Date(d)
        : typeof d === "object"
        ? new Date(d.year, d.month, d.date)
        : NaN;
    },
    compare: function (a, b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return isFinite((a = this.convert(a).valueOf())) &&
        isFinite((b = this.convert(b).valueOf()))
        ? (a > b) - (a < b)
        : NaN;
    },
    inRange: function (d, start, end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
      return isFinite((d = this.convert(d).valueOf())) &&
        isFinite((start = this.convert(start).valueOf())) &&
        isFinite((end = this.convert(end).valueOf()))
        ? start <= d && d <= end
        : NaN;
    },
  };

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  function onSend(messages) {
    for (const message of messages) {
      message.text = chatUser.name + ": " + message.text;
      sendMessage(message, selectedChat[0]);
    }
  }

  function renderChatHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar className="ToolBar">
          <Typography variant="h6" color="inherit">
            {selectedChat[1].groupName}
          </Typography>
          {selectedListing.isClosed ? (
            <h4>Order has been closed!</h4>
          ) : isEmpty(orderRecord) ? (
            <button className="OrderButton" onClick={openCreateOrderModal}>
              Order
            </button>
          ) : (
            <div>
              <button
                className="WithdrawOrderButton"
                onClick={openWithdrawOrderModal}
              >
                Withdraw Order
              </button>
              <button className="OrderButton" onClick={openEditOrderModal}>
                Edit Order
              </button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  function renderChat() {
    return (
      <GiftedChat
        user={chatUser}
        messages={messages.slice().reverse()}
        onSend={(messages) => onSend(messages)}
        onPressAvatar={(user) => {
          var linkString = "/user/" + user.name;
          history.push(linkString);
        }}
      />
    );
  }

  return (
    <div className="ChatBox" style={styles.chat}>
      <div className="ChatHeader">{renderChatHeader()}</div>
      {renderChat()}
    </div>
  );
}

export default ChatBox;
