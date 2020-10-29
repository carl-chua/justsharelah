import firebase from "./Firebase.js";

export async function getReviews(userId, setReviews) {
  const snapshot = await firebase
    .firestore()
    .collection("reviews")
    .where("reviewee", "==", userId)
    .get();

  var temp = []

  snapshot.forEach((doc) => {
    temp.push([doc.id, doc.data()])
  });

  setReviews(
      temp.sort((a,b) => b[1].date.toDate() < a[1].date.toDate())
  );

}

export function getReviewsListener(userId, setReviews) {
    const unsubscribe = firebase
    .firestore()
    .collection("reviews")
    .orderBy("date", "desc")
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        if (changes.type === "added") {
          setReviews((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setReviews([...prevData, [changes.doc.id,changes.doc.data()]]);
            }
          });
        } else if (changes.type === "modified") {
          //console.log('chats modified :', changes.doc.data())
          setReviews((prevData) =>
            prevData.map((data) => {
              //console.log('UPDATING?', message)
              if (data[0] === changes.doc.id) {
                return [changes.doc.id,changes.doc.data()];
              } else {
                return data;
              }
            })
          );
        } else if (changes.type === "removed") {
          setReviews((prevData) => 
            prevData.map((data) => {
              if(data[0] !== changes.doc.id) {
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
    await firebase
      .firestore()
      .collection("reviews")
      .add({
          reviewer : data.reviewer,
          reviewee : data.reviewee,
          message : data.message,
          numStars : data.numStars,
          date : new Date(),

      })
    return true;
}

export async function deleteReview(docId) {
    try {
        await firebase
          .firestore()
          .collection("reviews")
          .doc(docId)
          .delete()
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}