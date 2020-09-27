import firebase from "./Firebase.js";

export function getUserByUsernameListener(username,setUser) {
    const snapshot = firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .limit(1)

    const unsubscribe = snapshot.onSnapshot(docSnapshot => {
        docSnapshot.forEach(doc => {
            setUser(doc.data())
        })
    })

    return unsubscribe;
}

export async function getUserByUsername(username, setUser) {
    const snapshot = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get()

    snapshot.forEach(doc => {
        console.log("USERDATA: " + JSON.stringify(doc.data()))
        setUser(doc.data())
    })
    
}