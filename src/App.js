import React from 'react';
import './App.css';
import { demoListener, demoPost, demoFetch } from './API/DemoAPI';
import DemoPage from './DemoPage';

import { useSelector, useDispatch } from "react-redux";
import { demoHeader } from './Redux/actions';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(demoHeader('R123124123'));
  },[])

  return (
    <div className="App">
      <DemoPage/>
    </div>
  );
}

export default App;
