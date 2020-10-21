import firebase from "./Firebase.js";

export async function loadUser(setCurrentUser) {
  const snapshot = await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get();
  const user = snapshot.data();
  setCurrentUser(user);
  console.log(firebase.auth().currentUser.uid);
  console.log(user.data);
}
