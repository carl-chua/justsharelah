import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../API/Firebase";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavBar from "./NavBar";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      height: 500,
      maxheight: "100%"
    },

    joinChatButton: {
        margin: theme.spacing(6),
    },

    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
          theme.palette.type === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
   
  }));


const ListingDetails = () => {
    const classes = useStyles();
    var [listingTitle, setListingTitle] = React.useState('');
    var [listingTags, setListingTags] = React.useState('');
    var [targetOrderDate, setTargetOrderDate] = React.useState('');
    var [minQty, setMinQty] = React.useState('');
    var [desc, setDesc] = React.useState('');
    var [shopLink, setShopLink] = React.useState('');
    var [img, setImg] = React.useState('');
    var [location, setLocation] = React.useState('');
    var [category, setCategory] = React.useState('');
    var [authorName, setAuthorName] = React.useState('');
    
    //enter listing id for doc
    firebase.firestore().collection("listings").doc("mreWT8rB7FYFa3uuVaPl").get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setListingTitle(doc.data().title);
            setCategory(doc.data().category);
            setListingTags(doc.data().tags);
            setLocation(doc.data().location);
            setMinQty(doc.data().targetAmount);
            setDesc(doc.data().description);
            setTargetOrderDate(doc.data().targetOrderDate);
            setShopLink(doc.data().websiteLink);
            
            //get username of post author
            firebase.firestore().collection("users").doc(doc.data().listingOwner).get().then(function(doc) {
                if (doc.exists) {
                   setAuthorName(doc.data().username);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
    return (
        <div className={classes.root} style={{ background: "#f1f8e9" }}>
           <NavBar style={{ position: "sticky" }}/>
        <Grid container spacing={2}>
        
            
            <Grid item xs={6}
                style={{ maxheight: "100%" }}
                item
                xs={6}
                className={classes.image}

            />  
            
            
            <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Typography variant="h4" style={{ color: "#212121" }}>
                    {authorName}<Button className={classes.joinChatButton} variant="contained" color="primary" style={{ background: "#4db6ac" }}>
                         Join chat
                        </Button>
                </Typography>
              
                <Typography variant="h4" style={{ color: "#212121" }}>
                    {listingTitle}
                </Typography>
                <Typography variant="link" href={shopLink} style={{ color: "#4db6ac" }}>
                    {shopLink}
                </Typography>
                <Typography variant="h6" style={{ color: "#212121" }}>
                    Target order date:
                </Typography>

                <Typography variant="h7">
                    {targetOrderDate}
                </Typography>

                <Typography variant="h6" style={{ color: "#212121" }}>
                    Target amount: 
                </Typography>
                <Typography variant="h7" fontWeight="fontWeightBold">
                    {minQty}
                </Typography>
                <Typography variant="h6" style={{ color: "#212121" }}>
                    Location: 
                </Typography>
                <Typography variant="h7" fontWeight="fontWeightBold">
                     {location}
                </Typography>

                <Typography variant="h6" style={{ color: "#212121" }}>
                    Details:
                </Typography>
                <Typography variant="h7" fontWeight="fontWeightBold">
                    {desc}
                </Typography>

            </Paper>
            </Grid>
        
        </Grid>
        </div>
  
    );
}

export default ListingDetails;