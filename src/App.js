import React from "react";
import "./App.css";
import { demoListener, demoPost, demoFetch } from "./API/DemoAPI";
import DemoPage from "./DemoPage";
import { useSelector, useDispatch } from "react-redux";
import { demoHeader, reSignIn, currentUser as currUser } from "./Redux/actions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./Auth";
import HomePage from "./Components/HomePage";
import PrivateRoute from "./PrivateRoute";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import UserPage from "./Screens/UserPage";
import SettingsPage from "./Screens/SettingsPage";
import { Container } from "@material-ui/core";
import ListingDetails from "./Components/ListingDetails";
import CreateListing from "./Components/CreateListing";
import SearchResultsPage from "./Screens/SearchResultsPage";
import NavBar from "./Components/NavBar";

import UsersListingsPage from "./Screens/UsersListingsPage";
import UsersListingsPage2 from "./Screens/UsersListingsPage2";
import UsersListingPage from "./Screens/UsersListingPage";
import OrdersListingPage from "./Screens/OrdersListingPage";
import ChatPage from "./Components/ChatPage";
import { useAlert } from "react-alert";
import WalletPage from "./Screens/WalletPage";

import Apparel from "./Components/subpages/Apparel";
import Electronics from "./Components/subpages/Electronics";
import Accessories from "./Components/subpages/Accessories";
import Education from "./Components/subpages/Education";
import Beauty from "./Components/subpages/Beauty";
import Living from "./Components/subpages/Living";
import BabiesKids from "./Components/subpages/BabiesKids";
import Others from "./Components/subpages/Others";

function App() {
  const userToken = useSelector((state) => state.userToken);

  const dispatch = useDispatch();
  const alert = useAlert();

  return (
    <div className="App" style={{ height: "100vh", overflow : "hidden", }}>
      <AuthProvider dispatch={dispatch} alert={alert}>
        <Router>
          {userToken && <NavBar />}
          <div style = {{height: "100%", overflow : "scroll"}}>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/user/:username" component={UserPage} />
            <PrivateRoute
              exact
              path="/settings"
              component={SettingsPage}
            />
            <PrivateRoute exact path="/chat/:username" component={ChatPage} />
            <PrivateRoute
              exact
              path="/listingDetails/:id"
              component={ListingDetails}
            />
            <PrivateRoute
              exact
              path="/createListing"
              component={CreateListing}
            />
            <PrivateRoute exact path="/search" component={SearchResultsPage} />
            <PrivateRoute
              exact
              path="/usersListingsPage"
              component={UsersListingsPage}
            />
            <PrivateRoute
              exact
              path="/usersListingPage/:listingId"
              component={UsersListingPage}
            />
            <PrivateRoute
              exact
              path="/ordersListingPage"
              component={OrdersListingPage}
            />
            <PrivateRoute
              exact
              path="/usersListingsPage2"
              component={UsersListingsPage2}
            />
            <PrivateRoute
              exact
              path="/myWallet"
              component={WalletPage}
            />
            <PrivateRoute exact path="/categories/Electronics" component={Electronics} />
            <PrivateRoute exact path="/categories/Accessories" component={Accessories} />
            <PrivateRoute exact path="/categories/Apparel" component={Apparel} />
            <PrivateRoute exact path="/categories/Education" component={Education} />
            <PrivateRoute exact path="/categories/Living" component={Living} />
            <PrivateRoute exact path="/categories/Beauty" component={Beauty} />
            <PrivateRoute exact path="/categories/Babies&Kids" component={BabiesKids} />
            <PrivateRoute exact path="/categories/Others" component={Others} />
          </Switch>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;