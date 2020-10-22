import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../API/Firebase";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import NavBar from "./NavBar";


const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '1px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '50ch',
        '& > *': {
            margin: theme.spacing(1),
        },
        flexGrow: 1,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
      },
    },
    margin: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const listingButtonStyle = {
    background: '#8d6e63',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    
  };

const CreateListing = () => {
    const classes = useStyles();
    const [category, setCategory] = React.useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleTitle = (event) => {
        setListingTitle(event.target.value);
    };
    const handleTags = (event) => {
        setListingTags(event.target.value);
    };
    const handleTargetDate = (event) => {
        setTargetOrderDate(event.target.value);
    };
    const handleQty = (event) => {
        setMinQty(event.target.value);
    };
    const handleDesc = (event) => {
        setDesc(event.target.value);
    };
    const handleShopLink = (event) => {
        setShopLink(event.target.value);
    };
    const handleImg = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        console.log(typeof file.name);
        //setImg(await fileRef.getDownloadURL());
        alert("Image uploaded!");
    };
    const handleLocation = (event) => {
        setLocation(event.target.value);
    };
    const [listingTitle, setListingTitle] = React.useState('');
    const [listingTags, setListingTags] = React.useState('');
    const [targetOrderDate, setTargetOrderDate] = React.useState('');
    const [minQty, setMinQty] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [shopLink, setShopLink] = React.useState('');
    const [img, setImg] = React.useState('');
    const [location, setLocation] = React.useState('');

    let user = firebase.auth().currentUser;
    //.collection("users").doc(user.uid)
  
    const handleSubmit = (e) => {
        e.preventDefault();
        //save under user listings
        firebase.firestore().collection("users").doc(user.uid).collection("listings").add({
            user:user.uid,
            category: category,
            listingTitle: listingTitle,
            listingTags: listingTags,
            targetOrderDate: targetOrderDate,
            minQty: minQty,
            location:location,
            desc:desc,
            shopLink:shopLink,
            //img:img
           });
           //save under listings
        firebase.firestore().collection("listings").add({
           user:user.uid,
           category: category,
           listingTitle: listingTitle,
           listingTags: listingTags,
           targetOrderDate: targetOrderDate,
           minQty: minQty,
           location:location,
           desc:desc,
           shopLink:shopLink,
           dateCreated : new Date(),
           //img:img
          })
          .then(() => {
              alert("Listing created!")
          });
          
    };

    return (
        <div className={classes.root} style={{ background: "#f1f8e9" }}>
            <NavBar style={{ position: "sticky" }}/>
            <h2  style={{ textAlign: "center" }}>What would you like to list today? <CardGiftcardOutlinedIcon fontSize="medium"/></h2>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <Grid container spacing={0}  justify="center" alignItems="Stretch">
               
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                    <h4>Select category</h4>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="demo-customized-select-native">Select Category</InputLabel>
                            <NativeSelect
                                id="demo-customized-select-native"
                                value={category}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                >
                                <option aria-label="None" value="" />
                                <option value={"Apparel"}>Apparel</option>
                                <option value={"Electronics"}>Electronics</option>
                                <option value={"Accessories"}>Accessories</option>
                                <option value={"Education"}>Education</option>
                                <option value={"Beauty"}>Beauty</option>
                                <option value={"Living"}>Living</option>
                                <option value={"Babies&Kids"}>Babies&Kids</option>
                                <option value={"Food"}>Food</option>
                                <option value={"Others"}>Others</option>
                                
                            </NativeSelect>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                    
                    <TextField
                        required
                        id="outlined-required"
                        label="Listing Title"
                        placeholder="Listing Title"
                        variant="outlined"
                        value={listingTitle}
                        onChange={handleTitle}
                        
                    />
                 
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                    
                    <TextField
                        required
                        id="outlined-required"
                        label="Listing Tags"
                        placeholder="Add up to 10 keywords to help people find your listing"
                        variant="outlined"
                        value={listingTags}
                        onChange={handleTags}
                    />
                   
            
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                        <h4>Target Order Date</h4>
                        
                            <TextField
                            id="datetime-local"
                            
                            type="datetime-local"
                            placeholder="2020-12-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={targetOrderDate}
                            onChange={handleTargetDate}
                            />
                        
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                   
                        <TextField
                            required
                            id="outlined-number"
                            label="Minimum quantity to proceed with order"
                            type="number"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="outlined"
                            value={minQty}
                            onChange={handleQty}
                        />
                       
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                    
                    <TextField
                        required
                        id="outlined-required"
                        label="Location"
                        placeholder="Location"
                        variant="outlined"
                        value={location}
                        onChange={handleLocation}
                        
                    />
                 
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                    
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            placeholder="Tell people more about this listing"
                            variant="outlined"
                            value={desc}
                            onChange={handleDesc}
                        />
                        
                    </Paper>
                </Grid>
                
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                    
                        <TextField
                            required
                            id="outlined-required"
                            label="Link to shop"
                            placeholder="Shop link"
                            variant="outlined"
                            value={shopLink}
                            onChange={handleShopLink}
                        />
                    
                    </Paper>
                </Grid>
                <Grid item md={8} >
                    <Paper className={classes.paper}>
                        <h4>Upload photos</h4>
                        <div className={classes.root}>
                            <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            label="Upload photos"
                            value={img}
                            onChange={handleImg}
                           
                            />
                            <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                            </label>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" value={img} onChange={handleImg}/>
                            <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                            </label>
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <Paper className={classes.paper}>
                    <div className={classes.root}>
                        <Button type = "submit" variant="contained" style={listingButtonStyle}>
                            Submit listing
                        </Button>
                    </div>
                    </Paper>
                </Grid>

            
            </Grid>
            </form>
      </div>
    );
}


   


  
  export default CreateListing;
  