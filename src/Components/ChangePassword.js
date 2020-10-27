import React from 'react'
import {Box, Button} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

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

export default function Profile({data}) {

    const classes = useStyles()

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
                    defaultValue= {data.password}
                    variant="outlined"
                    size="small"
                    className = {classes.textfield}
                    />
                </div>
                <div>
                    <TextField
                    label="New Password"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    className = {classes.textfield}
                    />
                </div>
                <div>
                    <TextField
                    label="Confirm Password"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    className = {classes.textfield}
                    />
                </div>
                </form>
                <Button 
                    variant="contained" 
                    className = {classes.button}
                    >
                    Confirm
                </Button>   
        </Box>
    )
}