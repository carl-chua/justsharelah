import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Box, Avatar, Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { useSelector } from "react-redux";


import { makeStyles, useTheme } from '@material-ui/core/styles';
import "../Styles/Styles.css";

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
      value: 'SG',
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

export default function Profile({user}) {

    const classes = useStyles()

    const currentUser = useSelector(state => state.currentUser)

    const userToken = useSelector(state => state.userToken)

    const [country, setCountry] = React.useState('SG');
    
    const handleChange = (event) => {
    setCountry(event.target.value);
  };

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
                <Avatar 
                    src = {user.imageUrl} 
                    className = {classes.avatar}
                    style = {{
                        width:120,
                        height:120,
                        backgroundColor: '#7AA18A',
                        }}
                    >
                        <span style = {{fontSize:"300%"}}>{user.name.charAt(0).toUpperCase()}</span>
                </Avatar>
                <div>
                    <TextField
                    label="Name"
                    id="outlined-size-small"
                    defaultValue= {user.name}
                    variant="outlined"
                    size="small"
                    className = {classes.textfield}
                    />
                </div>
                <div>
                    <TextField
                    label="Mobile Number"
                    id="outlined-size-small"
                    defaultValue= {user.mobileNum}
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
                    onChange={handleChange}
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
            >
              Save Changes
            </Button>
        </Box>
        : null
    )
}