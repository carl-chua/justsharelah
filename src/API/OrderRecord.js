import firebase from "./Firebase.js";

export async function addOrder(itemList, quantityList, listingId) {
  const newOrder = await firebase.firestore().collection("orderRecords").add({
    listingId: listingId,
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
