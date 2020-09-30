import React from "react";
import "./App.css";
import { demoListener, demoPost, demoFetch } from "./API/DemoAPI";
import DemoPage from "./DemoPage";
import { useSelector, useDispatch } from "react-redux";
import { demoHeader } from "./Redux/actions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import HomePage from "./Components/HomePage";
import PrivateRoute from "./PrivateRoute";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import CreateListing from "./Components/CreateListing";
import ListingDetails from "./Components/ListingDetails";
import ChatWidget from "./Components/ChatWidget";
import ChatClient from "./Components/ChatClient";

import UserPage from './Screens/UserPage'
import { Container } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();

  // //Declare a new state variable, which we'll call "testData"
  // //The argument to useState is the initial state
  // //useState returns a pair of values: the current state and a function that updates it.
  // const[testData, setTestData] = useState([]);

  // Similar to componentDidMount and componentDidUpdate
  React.useEffect(() => {
    dispatch(demoHeader("R123124123"));
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div style={{height:"100vh"}}>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/createListing" component={CreateListing} />
            <Route exact path="/listingDetails" component={ListingDetails} />
            <Route exact path="/user/:username" component = {UserPage}/>
            <Route exact path="/chatWidget" component = {ChatWidget}/>
            <Route exact path="/chatClient" component = {ChatClient}/>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
