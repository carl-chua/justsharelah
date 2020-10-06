import React from 'react'
import {Box} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


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
    dropdown: {
        margin: "3%",
        minWidth: '50vw',
        textAlign: "start"
    },
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
  ];

export default function Profile({data}) {

    const classes = useStyles()
    const [country, setCountry] = React.useState('EUR');
    
    const handleChange = (event) => {
    setCountry(event.target.value);
  };

    return (
        <Box
            display = "flex"
            flexDirection = "column"
            style = {{
                display : "flex",
                flexDirection : "column",
                justifyContent : "space-between",
            }}
        >
            <form className={classes.form} noValidate autoComplete="off">
                <div>
                    <TextField
                    label="Name"
                    id="outlined-size-small"
                    defaultValue= {data.name}
                    variant="outlined"
                    size="small"
                    className = {classes.textfield}
                    />
                </div>
                <div>
                    <TextField
                    label="Mobile Number"
                    id="outlined-size-small"
                    defaultValue= {data.mobileNum}
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
                    defaultValue= {data.country}
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
        </Box>
    )
}