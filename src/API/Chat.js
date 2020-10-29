import firebase from "./Firebase.js";
import { getUserByIdForChat } from "./Users";

// I need a function that can retrieve all chat groups current logged in user is involved with
export async function getChatGroups(userToken) {
  const snapshot = await firebase
    .firestore()
    .collection("chatGroups")
    .where("members", "array-contains", userToken)
    .get();

  return snapshot;
}

// I need a function that persists messages
export async function sendMessage(message, selectedChat) {
  message.user = message.user.id;
  message.chatGroup = selectedChat;
  await firebase
    .firestore()
    .collection("messages")
    .doc(message.id)
    .set(message);
}

// I need a function that retrieves messages of a ChatGroup and listens
export function messagesListener(selectedChat, setMessages) {
  console.log("calling listener");
  console.log(selectedChat);
  const unsubscribe = firebase
    .firestore()
    .collection("messages")
    .where("chatGroup", "==", selectedChat)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(async function (changes) {
        const user = await getUserByIdForChat(changes.doc.data().user);
        console.log(user);
        const userObj = {
          id: changes.doc.data().user,
          name: user.username,
          avatar: user.photo,
        };
        var msg = {
          ...changes.doc.data(),
          createdAt: changes.doc.data().createdAt.toDate(),
          user: userObj,
        };

        if (changes.type === "added") {
          console.log("adding");
          setMessages((prevMessages) => {
            if (prevMessages.some((message) => message.id === msg.id)) {
              return prevMessages;
            } else {
              return setMessages([...prevMessages, msg]);
            }
          });
        }
      });
    });
  return unsubscribe;
}
