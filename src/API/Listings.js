import firebase from "./Firebase.js";


// There are two ways to retrieve data stored in Cloud Firestore.
// Either of these methods can be used with documents, collections of documents, 
// or the results of queries:
// 1.Call a method to get the data.
// 2.Set a listener to receive data-change events.
// When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data, 
// and then another snapshot each time the document changes.

export function getAllListingsListener(setListings) {
  const snapshot = firebase
  .firestore()
  .collection("listings")
  .limit(9)

  const observer = snapshot.onSnapshot(docSnapshot => {
      console.log("Received listings snapshot");
      docSnapshot.forEach(doc => {
          setListings(doc.data())
      })
  })

  return observer;
}

export async function getAllListings(setListings) {
  const snapshot = await firebase
  .firestore()
  .collection("listings")
  .limit(9)
  .get()

  snapshot.forEach(doc => {
      console.log("Listings: " + JSON.stringify(doc.data()))
      setListings(doc.data())
  })
  
}