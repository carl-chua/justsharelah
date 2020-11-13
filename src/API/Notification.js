import firebase from "./Firebase.js";

export async function addNotification(username, msg) {
  await firebase.firestore().collection("notifications").add({
    username: username,
    message: msg,
    isRead: false,
    dateCreated: new Date(),
  });
}

export function notificationListener(setNotifications, username) {
  const unsubscribe = firebase
    .firestore()
    .collection("notifications")
    .where("username", "==", username)
    .where("isRead", "==", false)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        if (changes.type === "added") {
          setNotifications((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setNotifications([
                ...prevData,
                [changes.doc.id, changes.doc.data()],
              ]);
            }
          });
        } else if (changes.type === "removed") {
          setNotifications((prevData) =>
            prevData.map((data) => {
              if (data && data[0] !== changes.doc.id) {
                return data;
              }
            })
          );
        } else if (changes.type === "modified") {
          setNotifications((prevData) =>
            prevData.map((data) => {
              if (data[0] === changes.doc.id) {
                return [changes.doc.id, changes.doc.data()];
              } else {
                return data;
              }
            })
          );
        }
      });
    });

  return unsubscribe;
}

export async function setAllUserNotificationsAsRead(username) {
  var batch = firebase.firestore().batch();

  var usersNotificationsRef = await firebase
    .firestore()
    .collection("notifications")
    .where("username", "==", username);

  try {
    await usersNotificationsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { isRead: true });
      });
    });

    await batch.commit();

    return true;
  } catch (err) {
    return false;
  }
}

export function getAllUserNotificationsListener(setAllNotifications, username) {
  const unsubscribe = firebase
    .firestore()
    .collection("notifications")
    .where("username", "==", username)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        const notiObj = {
          ...changes.doc.data(),
          dateCreated: changes.doc.data().dateCreated.toDate(),
        };
        if (changes.type === "added") {
          setAllNotifications((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setAllNotifications([
                ...prevData,
                [changes.doc.id, notiObj],
              ]);
            }
          });
        } else if (changes.type === "removed") {
          setAllNotifications((prevData) =>
            prevData.map((data) => {
              if (data[0] !== changes.doc.id) {
                return data;
              }
            })
          );
        } else if (changes.type === "modified") {
          setAllNotifications((prevData) =>
            prevData.map((data) => {
              if (data[0] === changes.doc.id) {
                return [changes.doc.id, notiObj];
              } else {
                return data;
              }
            })
          );
        }
      });
    });

  return unsubscribe;
}
