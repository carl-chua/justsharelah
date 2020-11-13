import firebase from "./Firebase.js";

// There are two ways to retrieve data stored in Cloud Firestore.
// Either of these methods can be used with documents, collections of documents,
// or the results of queries:
// 1.Call a method to get the data.
// 2.Set a listener to receive data-change events.
// When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data,
// and then another snapshot each time the document changes.

const db = firebase.firestore().collection("listings");

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
  return snapshot;
}

export const updateListing = (listing) => {
  db.doc(listing.id).update(listing);
  console.log("Updated listing: ", listing);
};

export async function getUserListing(userId) {
  const snapshot = await db.where("listingOwner", "==", userId).get();

  var temp = [];

  snapshot.forEach((doc) => {
    temp.push([doc.id, doc.data()]);
  });

  return temp;
}

export async function getUserListing2(userId) {
  const snapshot = await db.where("listingOwner", "==", userId).get();

  return snapshot;
}

/*export async function getFollowingListing(userIdList) {

}*/

export async function getListingById(listingId) {
  const snapshot = await db.doc(listingId).get();

  return snapshot;
}

export function getUserListingListener(userId, setUserListing) {
  const unsubscribe = firebase
    .firestore()
    .collection("listings")
    .where("listingOwner", "==", userId)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        if (changes.type === "added") {
          setUserListing((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setUserListing([
                ...prevData,
                [changes.doc.id, changes.doc.data()],
              ]);
            }
          });
        } else if (changes.type === "modified") {
          //console.log('chats modified :', changes.doc.data())
          setUserListing((prevData) =>
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
          setUserListing((prevData) =>
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

export async function addReview(data) {
  await firebase.firestore().collection("reviews").add({
    reviewer: data.reviewer,
    reviewee: data.reviewee,
    message: data.message,
    numStars: data.numStars,
    date: new Date(),
  });
  return true;
}

export async function getListingsByCategory(category, setListingResults) {
  const listings = firebase.firestore().collection("listings");
  const snapshot = await listings.where("category", "==", category).get();
  if (snapshot.empty) {
    console.log("No listings here");
    return;
  }
  var temp = [];

  snapshot.forEach((doc) => {
    temp.push([doc.id, doc.data()]);
  });

  setListingResults(temp);
}

export function getListingListener(listingId, setListing) {
  //console.log("LISTING ID" + listingId);
  const unsubscribe = firebase
    .firestore()
    .collection("listings")
    .doc(listingId)
    .onSnapshot(
      (docSnapShot) => {
        setListing(docSnapShot.data());
      },
      (error) => {
        setListing(null);
        console.log(error);
      }
    );

  return unsubscribe;
}

export function closeOrdersForListing(listingId) {
  return firebase
    .firestore()
    .collection("listings")
    .doc(listingId)
    .update({ isClosed: true });
}
