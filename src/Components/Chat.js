import React, { Component } from "react";
import ReactDOM from "react-dom";
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
import firebase from "../API/Firebase";
import { loadUser } from "../API/CurrentUser";

// const config = {
//   apiKey: "AIzaSyC9Hcq-eFBRGcC79SXtYp1NVDjsss3tEC8",
//   authDomain: "chat-16ee2.firebaseapp.com",
//   databaseURL: "https://chat-16ee2.firebaseio.com",
//   projectId: "chat-16ee2",
//   storageBucket: "chat-16ee2.appspot.com",
//   messagingSenderId: "703172176372",
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

function Chat() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [currentMessages, setMessages] = React.useState([]);
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  // constructor() {
  //   super();
  //   this.state = {
  //     messages: [],
  //     user: {},
  //     isAuthenticated: false,
  //   };
  // };

  // async signIn() {
  //   const googleProvider = new firebase.auth.GoogleAuthProvider();
  //   try {
  //     await firebase.auth().signInWithPopup(googleProvider);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // signOut() {
  //   firebase.auth().signOut();
  // }
  function loadCurrentUser() {
    loadUser(setCurrentUser);
  }

  function loadMessages() {
    const callback = snap => {
      const message = snap.val();
      message.id = snap.key;
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages });
    };
    firebase
      .database()
      .ref("/messages/")
      .limitToLast(12)
      .on("child_added", callback);
  };

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  React.useEffect(() => {
      if (currentUser != null) {
        setAuthenticated(true);
        loadMessages();
      } else {
        setCurrentUser({});
        setAuthenticated(false);
        setMessages([]);
      }
  }, [currentUser]);

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ isAuthenticated: true, user });
  //       this.loadMessages();
  //     } else {
  //       this.setState({ isAuthenticated: false, user: {}, messages: [] });
  //     }
  //   });
  // }

 

  // renderPopup() {
  //   return (
  //     <Dialog open={!this.state.isAuthenticated}>
  //       <DialogTitle id="simple-dialog-title">Sign in</DialogTitle>
  //       <div>
  //         <List>
  //           <ListItem button onClick={() => this.signIn()}>
  //             <ListItemAvatar>
  //               <Avatar style={{ backgroundColor: "#eee" }}>
  //                 <img
  //                   src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
  //                   height="30"
  //                   alt="G"
  //                 />
  //               </Avatar>
  //             </ListItemAvatar>
  //             <ListItemText primary="Sign in with Google" />
  //           </ListItem>
  //         </List>
  //       </div>
  //     </Dialog>
  //   );
  // };

  function saveMessage(message) {
    return firebase.firestore().collection("messages").add(message);
      // .database()
      // .ref("/messages/")
      // .push(message)
      // .catch(function(error) {
      //   console.error("Error saving message to Database:", error);
      // });
  }

  function onSend(messages) {
    for (const message of messages) {
      saveMessage(message);
    }
  }



  // function renderSignOutButton() {
  //   if (this.state.isAuthenticated) {
  //     return <Button onClick={() => this.signOut()}>Sign out</Button>;
  //   }
  //   return null;
  // }

  function renderChat() {
    return (
      <GiftedChat
        user={currentUser}
        messages={currentMessages}
        onSend={currentMessages => onSend(currentMessages)}
      />
    );
  }

  function renderChannels() {
    return (
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>D</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Default" />
        </ListItem>
      </List>
    );
  }

  function renderChannelsHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Groups
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  
  function renderChatHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Group Name
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  function renderSettingsHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  function render() {
    return (
      <div style={styles.container}>
        <div style={styles.channelList}>
          {renderChannelsHeader()}
          {renderChannels()}
        </div>
        <div style={styles.chat}>
          {renderChatHeader()}
          {renderChat()}
        </div>
        <div style={styles.settings}>
          {renderSettingsHeader()}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  channelList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
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

export default Chat;