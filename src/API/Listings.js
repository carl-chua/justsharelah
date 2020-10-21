import firebase from "./Firebase.js";


// There are two ways to retrieve data stored in Cloud Firestore.
// Either of these methods can be used with documents, collections of documents, 
// or the results of queries:
// 1.Call a method to get the data.
// 2.Set a listener to receive data-change events.
// When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data, 
// and then another snapshot each time the document changes.

// export function getAllListingsListener(setListings) {
//   const query = firebase
//   .firestore()
//   .collection("listings")
//   .limit(9);

//   const observer = query.onSnapshot(docSnapshot => {
//     console.log("Received listings snapshot");
//     docSnapshot.forEach(doc => {
//       setListings(doc.data())
//     });
//   }, err => {
//       console.log(`Encountered error: ${err}`);
//   });

//   return observer;
// }

const db = firebase.firestore().collection("listings");

export const addListing = (listing) => {
  return db.add(listing);
};

export const getListings = (size) => {
  return db.limit(size).get();
};

export async function getAllListings() {
  const snapshot = await db.get();
  snapshot.forEach(doc => {
    console.log(doc.name, '=>', doc.data());
  });
  return snapshot;

};

// export async const getAllListings = () => {
//   const snapshot = await db.get();
//   // snapshot.forEach(doc => {
//   //   console.log(doc.name, '=>', doc.data());
//   // });
//   return snapshot;
// };