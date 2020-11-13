import firebase from "./Firebase.js";

export function demoPost() {
  firebase
    .firestore()
    .collection("test")
    .add({
      testData: "Testing",
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function demoFetch(setTestData) {
  var temp = [];

  let snapshot = await firebase.firestore().collection("test").get();

  snapshot.forEach((doc) => {
    temp.push([doc.id, doc.data()]);
  });
  setTestData(temp);
}

export function demoListener(setTestData) {
  const unsubscribe = firebase
    .firestore()
    .collection("test")
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        if (changes.type === "added") {
          setTestData((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setTestData([...prevData, [changes.doc.id]]);
            }
          });
        } else if (changes.type === "modified") {
          //console.log('chats modified :', changes.doc.data())
          setTestData((prevData) =>
            prevData.map((data) => {
              //console.log('UPDATING?', message)
              if (data[0] === changes.doc.id) {
                return [changes.doc.id, changes.doc.data()];
              } else {
                return data;
              }
            })
          );
        } else if (changes.type === "removed") {
          setTestData((prevData) =>
            prevData.map((data) => {
              if (data[0] !== changes.doc.id) {
                return data;
              }
            })
          );
        }
      });
    });

  return unsubscribe;
}
