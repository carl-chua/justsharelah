import { Box, TextField, Button } from '@material-ui/core';
import { useAlert } from "react-alert";
import React from 'react';
import firebase from "../API/Firebase";

import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
      marginLeft : "2.5%",
      marginRight : "2.5%",
      marginBottom : "5%",
      borderBottom : "3",
  },
  labels: {
      fontSize: 20,
      fontWeight: "bold",
      lineHeight: 2.5,
  },
  form: {
      margin: "2%",
      width: "60vw",
  },
  textfield: {
      minWidth: "50vw",
      margin: "3%",
  },
  button: {
      backgroundColor: "#CC7F5D",
      color: "white",
      width: "15vw",
      minHeight: "6vh",
      marginBottom: "2%",
  }
})

export default function ChangePassword() {

  const classes = useStyles()
  const alert = useAlert();

  
  const [currPassword, setCurrPassword] = React.useState('');
  const handleCurrPassword = (event) => {
    setCurrPassword(event.target.value);
  };
  const [newPassword, setNewPassword] = React.useState('');
  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  // Reauthenticates the current user and returns a promise...
  function reauthenticate() {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currPassword);
    return user.reauthenticateWithCredential(cred);
  }


  // Changes user's password...
  const onChangePasswordPress = () => {
    reauthenticate().then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        alert.show("Password was changed");
      }).catch((error) => { console.log(error.message); });
    });
  }

    return (
        <Box
            display = "flex"
            flexDirection = "column"
            style = {{
                display : "flex",
                flexDirection : "column",
                justifyContent : "space-between",
                alignItems: "center"
            }}
        >
          <form className={classes.form} noValidate autoComplete="off">        
            <div>
            <TextField
            label="Current Password"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            className = {classes.textfield}
            onChange={handleCurrPassword}
            />
            </div>

            <div>
            <TextField
            label="New Password"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            className = {classes.textfield}
            onChange={handleNewPassword}
            />
            </div>

        <Button
          variant="contained"
          className={classes.button}
          onClick={onChangePasswordPress}        
        >
          Save Changes
        </Button>
        </form>
    
      </Box>
    );
  }
