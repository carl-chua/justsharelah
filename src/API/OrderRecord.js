import firebase from "./Firebase.js";
import { addNotification } from "./Notification";
import { getUserById2 } from "./Users";

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

export async function addOrder(items, listingId, currentUserUsername) {
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
      var listingDoc = await tn.get(listingRef);

      var listingOwner = (
        await getUserById2(listingDoc.data().listingOwner)
      ).data();
      var message =
        currentUserUsername +
        " has added an order to your listing " +
        listingDoc.data().title;

      addNotification(listingOwner.username, message);

      tn.set(newOrderRef, {
        listingId: listingId,
        paymentStatus: "UNPAID",
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
export async function getOrderRecord(orderRecordId, setOrderRecord) {
  var snapshot = await db.doc(orderRecordId).get();
  setOrderRecord(snapshot.data());
}

export async function getOrderRecordsByListingId(listingId, setOrderRecords) {
  let temp = [];

  var snapshot = await db.where("listingId", "==", listingId).get();

  snapshot.forEach((doc) => {
    temp.push([doc.id, doc.data()]);
  });

  setOrderRecords(temp);
}

// export async function getItemsFromOrderRecord(orderRecord) {
//   const snapshot = await db.doc(orderRecord).collection("items").get();

export async function getOrderRecordItems(orderRecordId) {
  const snapshot = await db.doc(orderRecordId).collection("items").get();

  return snapshot;
}

export async function deleteOrderRecord(orderRecordId) {
  var batch = firebase.firestore().batch();

  const existingOrdersItemsRef = firebase
    .firestore()
    .collection("orderRecords")
    .doc(orderRecordId)
    .collection("items");

  const orderRecordRef = firebase
    .firestore()
    .collection("orderRecords")
    .doc(orderRecordId);

  try {
    await existingOrdersItemsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    });

    await batch.delete((await orderRecordRef.get()).ref);

    await batch.commit();

    return true;
  } catch (err) {
    return false;
  }
}

export async function editOrder(items, orderRecordId) {
  var batch = firebase.firestore().batch();

  var existingOrdersItemsRef = firebase
    .firestore()
    .collection("orderRecords")
    .doc(orderRecordId)
    .collection("items");

  try {
    await existingOrdersItemsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    });

    for (const item of items) {
      var newOrderItem = existingOrdersItemsRef.doc();

      await batch.set(newOrderItem, {
        itemName: item.itemName,
        itemQty: item.itemQty,
        itemPrice: null,
        date: new Date(),
      });
    }

    await batch.commit();

    return true;
  } catch (err) {
    return false;
  }

  /*try {
    await firebase.firestore().runTransaction(async (tn) => {
      tn.get(existingOrdersItemsRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tn.delete(doc.ref);
        });
      });

      for (const item of items) {
        var newOrderItem = existingOrdersItemsRef.doc();
        tn.set(newOrderItem, {
          itemName: item.itemName,
          itemQty: item.itemQty,
          itemPrice: null,
          date: new Date(),
        });
      }
    });
    return true;
  } catch (err) {
    console.log("Editing err: " + err);
    return false;
  }*/

  /*existingOrdersItemsRef.listDocuments().then((val) => {
    val.map((val) => {
      val.delete();
    });
  });

  for (const item of items) {
    existingOrdersItemsRef.add({
      itemName: item.itemName,
      itemQty: item.itemQty,
      itemPrice: null,
      date: new Date(),
    });
  }*/
}

export async function getOrderRecordByListingIdAndUserId(listingId, userId) {
  const snapshot = await db
    .where("listingId", "==", listingId)
    .where("user", "==", userId)
    .get();

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

export function getOrderRecordsByListingIdListener(listingId, setOrderRecords) {
  let unsubscribe = firebase
    .firestore()
    .collection("orderRecords")
    .where("listingId", "==", listingId)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        if (changes.type === "added") {
          setOrderRecords((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setOrderRecords([
                ...prevData,
                [changes.doc.id, changes.doc.data()],
              ]);
            }
          });
        } else if (changes.type === "modified") {
          //console.log('chats modified :', changes.doc.data())
          setOrderRecords((prevData) =>
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
          setOrderRecords((prevData) =>
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

export function getUserOrders(userId, setOrders) {
  let unsubscribe = firebase
    .firestore()
    .collection("orderRecords")
    .where("user", "==", userId)
    .orderBy("date", "desc")
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

export async function setOrderPayment(orderId, receiptUrl) {
  try {
    await firebase.firestore().collection("orderRecords").doc(orderId).set(
      {
        paymentStatus: "PENDING",
        datePaid: new Date(),
        receiptImage: receiptUrl,
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    return false;
  }
}
export async function setOrderRequest(orderId, price, deliveryFee) {
  try {
    await firebase.firestore().collection("orderRecords").doc(orderId).set(
      {
        paymentStatus: "PENDING",
        price: price,
        deliveryFee: deliveryFee,
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    return false;
  }
}

export async function setOrderPaid(orderId) {
  try {
    await firebase.firestore().collection("orderRecords").doc(orderId).set(
      {
        paymentStatus: "PAID",
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    return false;
  }
}

export async function setOrderItemPrice(orderId, itemId, price) {
  try {
    await firebase
      .firestore()
      .collection("orderRecords")
      .doc(orderId)
      .collection("items")
      .doc(itemId)
      .set(
        {
          itemPrice: price,
        },
        { merge: true }
      );
    return true;
  } catch (err) {
    return false;
  }
}
