import React from 'react';
import './App.css';
import { demoListener, demoPost, demoFetch } from './API/DemoAPI';

function App() {

  const[testData, setTestData] = React.useState([]);

  function testPost() {
    demoPost(setTestData);
  }

  function testFetch() {
    demoFetch(setTestData);
  }

  React.useEffect(() => {
    const unsubscribe = demoListener(setTestData);

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
