import firebase from "./Firebase.js";
import randomstring from "randomstring";

export async function uploadReceipt(file) {
  let url = await new Promise((resolve, reject) => {
    let randomId = randomstring.generate({
      length: 16,
      charset: "alphanumeric",
    });
    let uploadTask = firebase
      .storage()
      .ref()
      .child("receipts")
      .child(randomId)
      .put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        console.log("ERORR: " + error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          //console.log("URL: " + downloadURL)
          resolve({
            default: downloadURL,
            id: randomId,
          });
        });
      }
    );
  });
  return [url.id, url.default];
}

export function deleteImages(files) {
  for (const file of files) {
    try {
      firebase.storage().ref().child("receipts").child(file[0]).delete();
    } catch (err) {
      console.log(err);
    }
  }
}
