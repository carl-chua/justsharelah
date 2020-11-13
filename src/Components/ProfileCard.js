import React, { Component, Fragment } from 'react';
import firebase from "../API/Firebase";
import PropTypes from 'prop-types';
import { Box, Avatar, Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import Grid from '@material-ui/core/Grid';

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

    textfield: {
      margin: "3%",
      minWidth: '60vw',
      textAlign: "start"
    },
    dropdown: {
        margin: "3%",
        minWidth: '60vw',
        textAlign: "start"
    },
    button: {
      backgroundColor: "#CC7F5D",
      color: "white",
      width: "15vw",
      minHeight: "6vh",
      marginBottom: "2%",
    },
    input: {
        display: 'none'
    },
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
    const handleCountry = (event) => {
      setCountry(event.target.value);
    };    

    const [phone, setPhone] = React.useState(user.phoneNumber);
    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
    };
    var phoneno = /^\d{7}$/;
    const phoneerror = !phone.match(phoneno);

    const [region, setRegion] = React.useState(user.region);


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
        region : region,
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
                justifyContent : "space-between",
                alignItems: "center",
            }}
        >
          <h1>Edit Profile</h1>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}
                  style = {{
                    display : "flex",
                    flexDirection : "column",
                    alignItems: "center",
                    fontSize: '1.6rem',
                    fontWeight: '800',
                  }}
                >
                  Profile Photo
                  <Avatar 
                      src = {imgUrl} 
                      style = {{
                          width:140,
                          height:140,
                          backgroundColor: '#7AA18A',
                          marginTop: '12%',
                        }}
                      >
                      <span style = {{fontSize:"300%"}}>{user.username.charAt(0).toUpperCase()}</span>
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm={6}
                  style = {{
                    display: 'flex',
                    flexDirection : 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    textAlign: 'left',
                    }}
                >
                  <div
                    style = {{
                    marginBottom: '5%',
                    }}
                  >
                  Clear frontal face photos are an important way for buyers and sellers to learn about each other.
                  </div>
                    <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    label="Upload a photo of your listing"
                    value={img}
                    onChange={useHandleImg}
                    
                    />
                    <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                        Upload a Photo
                    </Button>
                    </label>
                </Grid>

                <Grid item xs={12} sm={4}
                  style = {{
                    display : "flex",
                    flexDirection : "column",
                    justifyContent : "flex-start",
                    marginTop: '6%',
                    marginBottom: '2%',
                    fontSize: '1.6rem',
                    fontWeight: '800',
                  }}
                >
              Personal Details
              </Grid>
              </Grid>
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
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)} 
          whitelist={["SG", "HK", "MY", "ID"]} 
          style = {{
            margin: "1%",
            marginBottom: '5%',
            minWidth: '44vw',
            maxWidth: '44vw',
            minHeight: '6vh',
            textAlign: "start",
          }}
          />
        <RegionDropdown
          country={country}
          value={user.region}
          onChange={(val) => setRegion(val)} 
          style = {{
            margin: "1%",
            marginBottom: '5%',
            minWidth: '14vw',
            maxWidth: '14vw',
            minHeight: '6vh',
            textAlign: "start",
          }}
          />
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