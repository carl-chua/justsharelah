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
import Chat from "./Components/Chat";
import UserPage from './Screens/UserPage';
import SettingsPage from './Screens/SettingsPage';
import { Container } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();

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
            <Route exact path="/user/:username" component = {UserPage}/>
            <Route exact path="/settings/:username" component = {SettingsPage}/>
            <Route exact path="/chat" component = {Chat}/>

          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
