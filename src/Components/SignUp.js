import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../API/Firebase";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "../Styles/LogIn.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#F5F8F6",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#7AA28A",
    "&:hover": {
      backgroundColor: "#7AA28A",
    },
  },
  smalllinks: {
    color: "#67776D",
  },
  input: {
    borderColor: "#828282",
    borderWidth: 1,
    "&:hover": {
      borderColor: "#828282",
      borderWidth: 2,
    },
  },
}));

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const {
        email,
        password,
        username,
        phoneNumber,
        country,
        city,
      } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

        let user = firebase.auth().currentUser;
        if (user) {
          // User is signed in.
          try {
            await firebase.firestore().collection("users").doc(user.uid).set({
              email: email.value,
              username: username.value,
              phoneNumber: phoneNumber.value,
              country: country.value,
              city: city.value,
            });
            //const alert = Alert.alert("You have successfully signed up.");
          } catch (error) {
            //const alert = Alert.alert(`An error occured while signing up`);
            console.log("ERROR : ", error);
            await user.delete();
          }
        }
        history.push("/");
      } catch (error) {
        /*const alert = Alert.alert(
          `This email has been taken. Please use another email for sign-up.`
        );*/
        console.log("ERROR : ", error);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <label>
          Username
          <input name="username" type="text" placeholder="Username" />
        </label>
        <label>
          Phone Number
          <input name="phoneNumber" type="number" placeholder="Phone Number" />
        </label>
        <label>
          Country
          <input name="country" type="text" placeholder="Country" />
        </label>
        <label>
          City
          <input name="city" type="text" placeholder="City" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">
        <button>Go Login Page</button>
      </Link>
    </div>
  );
};

export default withRouter(SignUp);
