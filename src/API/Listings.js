import firebase from "./Firebase.js";

// There are two ways to retrieve data stored in Cloud Firestore.
// Either of these methods can be used with documents, collections of documents,
// or the results of queries:
// 1.Call a method to get the data.
// 2.Set a listener to receive data-change events.
// When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data,
// and then another snapshot each time the document changes.

export function getAllListingsListener(setListings) {
  const snapshot = firebase.firestore().collection("listings").limit(9);

  const observer = snapshot.onSnapshot((docSnapshot) => {
    console.log("Received listings snapshot");
    docSnapshot.forEach((doc) => {
      setListings(doc.data());
    });
  });

  return observer;
}

/*export async function getAllListings(setListings) {
  const snapshot = await firebase
  .firestore()
  .collection("listings")
  .limit(9)
  .get()

  snapshot.forEach(doc => {
      //console.log("Listings: " + JSON.stringify(doc.data()))
      setListings(doc.data())
  })
  
}*/
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
  db.add(listing);
  console.log("Added listing: ", listing);
};

export async function searchListings(searchString, size) {
  if (searchString == null) {
    const snapshot = await db.limit(size).get();
    return snapshot;
  } else {
    const snapshot = await db
      .where("listingTitle", ">=", searchString)
      .where("listingTitle", "<=", searchString + "\uf8ff")
      .limit(size)
      .get();
    return snapshot;
  }
}

export async function getAllListings() {
  // get() is asynchronous
  const snapshot = await db.get();
  // snapshot.forEach((doc) => {
  // console.log(doc.id, "=>", doc.data());
  // });
  return snapshot;
}

export const updateListing = (listing) => {
  db.doc(listing.id).update(listing);
  console.log("Updated listing: ", listing);
};
