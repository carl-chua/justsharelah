import firebase from "./Firebase.js";

const db = firebase.firestore().collection("orderRecords");

export async function addOrder(itemList, quantityList, listingId) {
  const newOrder = await firebase.firestore().collection("orderRecords").add({
    itemList: itemList,
    quantityList: quantityList,
    hasPaid: false,
    datePaid: null,
    price: null,
    receiptImage: null,
    user: firebase.auth().currentUser.uid,
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
}

export async function getOrderRecordById(id) {
  const snapshot = await db.doc(id).get();
  return snapshot;
}
