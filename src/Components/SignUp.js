import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../API/Firebase";

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
    </div>
  );
};

export default withRouter(SignUp);
