import React, { useState } from "react";
import { Link } from 'react-router-dom';
import firebase from "../API/Firebase";
import { Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";



const useStyles = makeStyles({
    root: {
      marginLeft: "2.5%",
      marginRight: "2.5%",
      marginBottom: "5%",
      borderBottom: "3",
    },
    labels: {
      fontSize: 20,
      fontWeight: "bold",
      lineHeight: 2.5,
    },
  
    textfield: {
      margin: "3%",
      width: "40vw",
      textAlign: "start",
    },

    button: {
      backgroundColor: "#CC7F5D",
      color: "white",
      width: "20vw",
      maxHeight: "8vh",
      marginBottom: "2%",
      fontSize: '1.3rem',
    },

    link: {
        textDecoration: 'none',
        color: '#7AA18A',
        fontSize: '1.3rem',
    },

    alert: {
        color: '#6B0B0B',
    }
  });

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const classes = useStyles();
  
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const auth = firebase.auth();

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };

  return (
    <Box
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: "6%",
            marginBottom: "2%",
            fontSize: "1.6rem",
            fontWeight: "800",
        }}
    >
    
      <div className="border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <h2>
        Reset your Password
      </h2>
        <form action="">
          {emailHasBeenSent && (
            <div className={classes.alert}>
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}
          <div>
          <TextField
            label="Email Address"
            id="outlined-size-small"
            onChange={handleEmail}
            variant="outlined"
            size="small"
            className={classes.textfield}
          />
        </div>
          <Button
            onClick={sendResetEmail}
            className={classes.button}
          >
            Send me a reset link
          </Button>
        </form>
        <Link to ="/"
          className={classes.link}
        >
          &larr; back to sign in page
        </Link>
      </div>
    </Box>
  );
};
