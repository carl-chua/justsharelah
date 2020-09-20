import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './Firebase.js'

function App() {

  const[testData, setTestData] = React.useState([]);

  function testPost() {
    firebase.firestore()
      .collection("test")
      .add({
        testData : 'Testing',
      })
      .catch(err => {
        console.log(err);
      }) 
  }

  async function testFetch() {
    var temp = []
    
    let snapshot = await firebase.firestore()
      .collection("test")
      .get();

    snapshot.forEach((doc) => {
      temp.push([doc.id,doc.data()]);
    });
    setTestData(temp);
  }

  React.useEffect(() => {
    const unsubscribe = firebase
    .firestore()
    .collection("test")
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (changes) {
        if (changes.type === "added") {
          setTestData((prevData) => {
            if (prevData.some((data) => data[0] === changes.doc.id)) {
              return prevData;
            } else {
              return setTestData([...prevData, [changes.doc.id,changes.doc.data()]]);
            }
          });
        } else if (changes.type === "modified") {
          //console.log('chats modified :', changes.doc.data())
          setTestData((prevData) =>
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
          setTestData((prevData) => 
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

  })

  return (
    <div className="App">
      <button onClick={testPost}>post test</button>
      <button onClick={testFetch}>fetch test</button>
      {testData.map(data => 
        <div>
          {data ?
          <p> DOC ID:{data[0]} data:{JSON.stringify(data[1])}</p>
          :
          null
          }
        </div>)}
    </div>
  );
}

export default App;
