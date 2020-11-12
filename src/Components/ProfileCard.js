import React, { Component, Fragment } from 'react';
import firebase from "../API/Firebase";
import PropTypes from 'prop-types';
import { Box, Avatar, Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Paper from '@material-ui/core/Paper';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import "../Styles/Styles.css";
import { firestore } from 'firebase';

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
    data: {
        fontSize: 20,
    },
    form: {
        margin: "2%",
        width: "60vw",
    },
    avatar: {
      marginBottom : "2%",
      marginLeft: "10%",
    },
    textfield: {
        minWidth: "50vw",
        margin: "3%",
    },
    dropdown: {
        margin: "3%",
        minWidth: '50vw',
        textAlign: "start"
    },
    button: {
      backgroundColor: "#CC7F5D",
      color: "white",
      width: "15vw",
      minHeight: "6vh",
      marginBottom: "2%",
    }
})

const countries = [
    {
      value: 'singapore',
      label: 'Singapore',
    },
    {
      value: 'MSIA',
      label: 'Malaysia',
    },
    {
      value: 'INDO',
      label: 'Indonesia',
    },
    {
      value: 'HK',
      label: 'Hong Kong',
    },
];

const SGcities = [
  {
    value: 'singapore',
    label: 'Singapore',
  },
];



export default function Profile({user}) {

    const classes = useStyles()

    const [username, setName] = React.useState(user.username);
    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const [country, setCountry] = React.useState(user.country);
    const handleCountryChange = (event) => {
      setCountry(event.target.value);
    };

    const [phone, setPhone] = React.useState(user.phoneNumber);
    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
    };
    var phoneno = /^\d{7}$/;
    const phoneerror = !phone.match(phoneno);

    const [city, setCity] = React.useState(user.city);
    const handleCityChange = (event) => {
      setCity(event.target.value);
    };

    const [img, setImg] = React.useState('');
    const [photoId, setPhotoId] = React.useState('');

    const profileUrl = '';

  async function handleSaveChanges() {
    try {
      const docId = user.uid;

      let curruser = firebase.auth().currentUser;

      await firebase.firestore().collection('users').doc(curruser.uid).set({
        username : username,
        phoneNumber : phone,
        city : city,
        country : country,
        imageUrl : photoId,
      }, { merge: true })
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function useHandleImg (e) {
    //generate random string for reference to image stored in storage
    var imgId = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
       imgId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    setPhotoId(imgId);
    firebase.storage().ref().child('image').child(imgId).getDownloadURL().then(url => {
      console.log(url);
      profileUrl = url;
    })
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child('image');
    fileRef.child(imgId).put(file);
    //console.log(typeof file.name);
    alert("Image uploaded!");
  };

  var [imgUrl, setImgUrl] = React.useState("");

  function loadPhoto() {
    // Create a reference to the file we want to download
    const storageRef = firebase.storage().ref();
      var photoRef = storageRef.child("image").child(user.imageUrl);

      // Get the download URL
      photoRef.getDownloadURL().then(function (url) {
        setImgUrl(url);
      });
  }

  React.useEffect(() => {
    loadPhoto();
  }, []);

    return (
      
      user ?
        <Box
            display = "flex"
            flexDirection = "column"
            style = {{
                display : "flex",
                flexDirection : "column",
                justifyContent : "center",
                alignItems: "center",
            }}
        >
            <form className={classes.form} noValidate autoComplete="off">
            <div>
                <Avatar 
                    src = {imgUrl} 
                    className = {classes.avatar}
                    style = {{
                        width:120,
                        height:120,
                        backgroundColor: '#7AA18A',
                        }}
                    >
                    <span style = {{fontSize:"300%"}}>{user.username.charAt(0).toUpperCase()}</span>
                </Avatar>
                <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                label="Upload photos"
                value={img}
                onChange={useHandleImg}
                
                />
              
              </div>
                <div>
                    <TextField
                    label="Username"
                    id="outlined-size-small"
                    defaultValue= {user.username}
                    onChange={handleNameChange}
                    variant="outlined"
                    size="small"
                    className = {classes.textfield}
                    />
                </div>
                <div>
                    <TextField
                    label="Mobile Number"
                    id="outlined-size-small"
                    defaultValue= {user.phoneNumber}
                    onChange={handlePhoneChange}
                    helperText={phoneerror ? "Phone Number needs to be 7 digits" : null}
                    error={phoneerror}
                    variant="outlined"
                    size="small"
                    className = {classes.textfield}
                    />
                </div>
                <div>
                    <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Country"
                    defaultValue= {user.country}
                    value = {country}
                    onChange={handleCountryChange}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                    className = {classes.dropdown}
                  >
                    {countries.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    </TextField>
                    <TextField
                    id="outlined-select-currency-native"
                    select
                    label="City"
                    defaultValue= {user.city}
                    value = {city}
                    onChange={handleCityChange}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                    className = {classes.dropdown}
                  >
                    {countries.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    </TextField>
                    
                </div>
            </form>
              <Button 
              variant="contained" 
              className = {classes.button}
              onClick = {handleSaveChanges}
            >
              Save Changes
            </Button>
        </Box>
        : null
    )
  }