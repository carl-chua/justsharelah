import firebase from "./Firebase.js";

const db = firebase.firestore().collection("orderRecords");

/*export async function addOrder(itemList, quantityList, listingId) {
  const newOrder = await firebase.firestore().collection("orderRecords").add({
    listingId: listingId,
    itemList: itemList,
    quantityList: quantityList,
    hasPaid: false,
    datePaid: null,
    price: null,
    receiptImage: null,
    user: firebase.auth().currentUser.uid,
    date: new Date(),
  });
  await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      orderRecords: firebase.firestore.FieldValue.arrayUnion(newOrder.id),
    });
  await firebase
    .firestore()
    .collection("listings")
    .doc(listingId)
    .update({
      orderRecords: firebase.firestore.FieldValue.arrayUnion(newOrder.id),
    });
}*/

export async function addOrder(items, listingId) {
  var newOrderRef = firebase.firestore().collection("orderRecords").doc();
  var newOrderItemsCollectionRef = newOrderRef.collection("items");
  var userRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);
  var listingRef = firebase.firestore().collection("listings").doc(listingId);

  try {
    await firebase.firestore().runTransaction(async (tn) => {
      var userDoc = await tn.get(userRef);
      console.log("DEBUG LINE 1");
      var listingDoc = await tn.get(listingRef);
      console.log("DEBUG LINE 2");

      tn.set(newOrderRef, {
        listingId: listingId,
        hasPaid: false,
        datePaid: null,
        price: null,
        receiptImage: null,
        user: firebase.auth().currentUser.uid,
        date: new Date(),
      });

      for (const item of items) {
        var newOrderItem = newOrderItemsCollectionRef.doc();

        tn.set(newOrderItem, {
          itemName: item.itemName,
          itemQty: item.itemQty,
          itemPrice: null,
          date: new Date(),
        });
      }

      tn.update(userRef, {
        orderRecords: userDoc.orderRecords
          ? firebase.firestore().FieldValue.arrayUnion(newOrderRef.id)
          : [newOrderRef.id],
      });

      tn.update(listingRef, {
        orderRecords: listingDoc.orderRecords
          ? firebase.firestore.FieldValue.arrayUnion(newOrderRef.id)
          : [newOrderRef.id],
      });
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getOrderRecordsByListingId(listingId, setOrderRecords) {
  let temp = [];

  var snapshot = await db.where("listingId", "==", listingId).get();

  snapshot.forEach((doc) => {
    temp.push([doc.id, doc.data()]);
  });

  setOrderRecords(temp);
}

export async function getItemsFromOrderRecord(orderRecord) {
  const snapshot = await db.doc(orderRecord).collection("items").get();
  return snapshot;
}

export async function getOrderItems(orderId, setItems) {
  let temp = [];

  var snapshot = await firebase
    .firestore()
    .collection("orderRecords")
    .doc(orderId)
    .collection("items")
    .get();

  snapshot.forEach((doc) => {
    temp.push([doc.id, doc.data()]);
  });

  setItems(temp);
}

export async function getOrderItemsListener(orderId, setItems) {
  let unsubscribe = await firebase
    .firestore()
    .collection("orderRecords")
    .doc(orderId)
    .collection("items")
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        if (changes.type === "added") {
          setItems((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setItems([
                ...prevData,
                [changes.doc.id, changes.doc.data()],
              ]);
            }
          });
        } else if (changes.type === "modified") {
          //console.log('chats modified :', changes.doc.data())
          setItems((prevData) =>
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
          setItems((prevData) =>
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

export async function getUserOrders(userId, setOrders) {
  let unsubscribe = await firebase
    .firestore()
    .collection("orderRecords")
    .where("user", "==", userId)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        if (changes.type === "added") {
          setOrders((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setOrders([
                ...prevData,
                [changes.doc.id, changes.doc.data()],
              ]);
            }
          });
        } else if (changes.type === "modified") {
          //console.log('chats modified :', changes.doc.data())
          setOrders((prevData) =>
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
          setOrders((prevData) =>
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
