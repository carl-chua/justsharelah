import React from 'react';
import firebase from "./API/Firebase";

import { signIn, signOut, currentUser } from "./Redux/actions";

export const AuthContext = React.createContext();

const AuthProvider = ({ children, dispatch, alert }) => {
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        //console.log("EMAIL : " + data.email + " PASSWORD : " + data.password);
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password);

          var user = firebase.auth().currentUser;
          if (user) {
            try {
              let userData = await firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .get();
              dispatch(signIn(user.uid));
              //console.log('USERDATA:', userData.data())
              dispatch(currentUser(userData.data()));
            } catch (err) {
              console.log("ERROR FETCHING DATA:", err);
              alert.show("Error occured while logging you in");
            }
            //} else {
            //alert.show("Please verify your email address and try again.");
            //}
          } else {
            console.log("failed to fetch data");
          }
        } catch (error) {
          console.log(error.toString());
          alert.show(
            "The username/password combination is invalid. Please try again."
          );
        }
      },
      signOut: async () => {
        try {
          console.log("LOGGING OUT");
          firebase.auth().signOut();
          dispatch(signOut());
        } catch (error) {
          alert.show("Error logging out");
        }
      },
      signUp: async (data) => {
        try {
          console.log(
            "TRYING SIGNUP USERNAME : " +
              data.username +
              " | email : " +
              data.email
          );
          var snapshot = await firebase
            .firestore()
            .collection("users")
            .where("usernameLower", "==", data.username.toLowerCase())
            .get();

          if (!snapshot.empty) {
            alert.show(
              `The username has been taken. Please use another username for sign-up.`
            );
            return;
          }

          await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password);

          var user = firebase.auth().currentUser;
          if (user) {
            // User is signed in.
            try {
              await user.updateProfile({ username: data.username });

              await firebase.firestore().collection("users").doc(user.uid).set({
                email: data.email,
                username: data.username,
                phoneNumber: data.phoneNumber,
                country: data.country,
                city: data.city,
                photo: null,
                followers: [],
                following: [],
                userReviews: [],
                listingsAsMember: [],
                listingsAsOP: [],
                orderRecords: [],
                usernameLower: data.username.toLowerCase(),
              });
              //dispatch(signIn(user.uid))
              user.sendEmailVerification();
              alert.show("You have successfully signed up.");
              return true;
            } catch (error) {
              alert.show(`An error occured while signing up`);
              console.log("ERROR : ", error);
              await user.delete();
            }
          }
        } catch (error) {
          alert.show(
            `The email has been taken. Please use another email for sign-up.`
          );
          console.log("ERROR : ", error);
        }
        return false;
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;