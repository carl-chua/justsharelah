import React from "react";
import "./App.css";
import { demoListener, demoPost, demoFetch } from "./API/DemoAPI";
import DemoPage from "./DemoPage";
import { useSelector, useDispatch } from "react-redux";
import { demoHeader, reSignIn, currentUser as currUser } from "./Redux/actions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import HomePage from "./Components/HomePage";
import PrivateRoute from "./PrivateRoute";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Chat from "./Components/Chat";
import UserPage from "./Screens/UserPage";
import SettingsPage from "./Screens/SettingsPage";
import { Container } from "@material-ui/core";
import ListingDetails from "./Components/ListingDetails";
import CreateListing from "./Components/CreateListing";
import SearchResultsPage from "./Screens/SearchResultsPage";
import NavBar from "./Components/NavBar";


import UsersListingsPage from "./Screens/UsersListingsPage";

function App() {

  const userToken = useSelector(state => state.userToken);

  return (
    <div className="App" style={{height : "100vh"}}>
      <AuthProvider>
        <Router>
        {userToken && <NavBar/>}
          <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/user/:username" component={UserPage} />
            <Route exact path="/settings/:username" component={SettingsPage} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/listingDetails" component={ListingDetails} />
            <Route exact path="/createListing" component={CreateListing} />
            <Route exact path="/search" component={SearchResultsPage} />
            <Route exact path="/usersListingsPage" component={UsersListingsPage} />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
