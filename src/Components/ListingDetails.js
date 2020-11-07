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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    media: {
        height: 500,
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
    var [photo, setPhoto] = React.useState('');
    var [imgUrl, setImgUrl] = React.useState('');
    var [members, setMembers] = React.useState('');
    var [kuppers, setKuppers] = React.useState('');
    var [membersArray, setMembersArray] = React.useState([]);
    var [chatGroup, setChatGroup] = React.useState('');

    let user = firebase.auth().currentUser;
    //get listing id from params
    let { id } = useParams();
    var listingId = id; 

    async function handleLeave() {
        
        //const index = membersArray.indexOf(user.uid);
        //remove user id from members
        //if (index > -1) {
         // membersArray.splice(index, 1);
        //}
        //console.log(membersArray);
        //update db
        //var listingRef = firebase.firestore().collection("listings").doc(id);
        //return listingRef.update({
            //members: firebase.firestore.FieldValue.arrayRemove(user.uid),
        //})
        var listingRef = firebase.firestore().collection("listings").doc(id);
        var chatGroupRef = firebase.firestore().collection("chatGroups").doc(chatGroup);
        try {
            await firebase.firestore().runTransaction(async (tn) => {

                tn.update(listingRef, {
                members: firebase.firestore.FieldValue.arrayRemove(user.uid),
                });
                tn.update(chatGroupRef, {
                    members: firebase.firestore.FieldValue.arrayRemove(user.uid),
                });
                alert("Left listing!");
                return true;
            });
        } catch (err) {
            console.log("TRANSACTION FAILED");
            console.log(err);
            return false;
        }
    }
    

    async function handleJoin() {
        //membersArray.push(user.uid);
        
        //update db
        //var listingRef = firebase.firestore().collection("listings").doc(id);
        //return listingRef.update({
            //members: firebase.firestore.FieldValue.arrayUnion(user.uid),
        //})
        var listingRef = firebase.firestore().collection("listings").doc(id);
        var chatGroupRef = firebase.firestore().collection("chatGroups").doc(chatGroup);
        try {
            await firebase.firestore().runTransaction(async (tn) => {

                tn.update(listingRef, {
                members: firebase.firestore.FieldValue.arrayUnion(user.uid),
                });
                tn.update(chatGroupRef, {
                    members: firebase.firestore.FieldValue.arrayUnion(user.uid),
                });
                alert("Joined listing!");
                return true;
            });
        } catch (err) {
            console.log("TRANSACTION FAILED");
            console.log(err);
            return false;
        }
    }

    //enter listing id for doc
    firebase.firestore().collection("listings").doc(id).onSnapshot(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setListingTitle(doc.data().title);
            setCategory(doc.data().category);
            setListingTags(doc.data().tags);
            setLocation(doc.data().location);
            setMinQty(doc.data().targetAmount);
            setDesc(doc.data().description);
            setTargetOrderDate(doc.data().targetOrderDate);
            setShopLink("https://" + doc.data().websiteLink);
            setPhoto(doc.data().photo);
            setMembers(doc.data().members.length);
            setKuppers(doc.data().kuppers.length);
            setMembersArray(doc.data().members);
            setChatGroup(doc.data().chatGroup);
            // Create a reference to the file we want to download
            const storageRef = firebase.storage().ref();
            var photoRef = storageRef.child('image').child(photo);

            // Get the download URL
            photoRef.getDownloadURL().then(function(url) {
              setImgUrl(url);
            
            }).catch(function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                // File doesn't exist
                alert("File doesn't exist");
                break;

                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                alert("User doesn't have permission to access the object");
                break;

                case 'storage/canceled':
                // User canceled the upload
                alert("User canceled the upload");
                break;

                case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                //alert("Unknown error occurred");
                break;
            }
            });
            //get username of post author
            firebase.firestore().collection("users").doc(doc.data().listingOwner).get().then(function(doc) {
                if (doc.exists) {
                   setAuthorName(doc.data().username);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    alert("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
                alert("Error getting document");
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            alert("No such document!");
        }
    });
    
    return (
        <div className={classes.root} style={{ background: "#f1f8e9" }}>
           <NavBar style={{ position: "sticky" }}/>
        <Grid container spacing={2}>
        
            
            <Grid item xs={6}>

                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image= {imgUrl}
                        title="Listing photo"
                        />
                    </CardActionArea>
                </Card>
            </Grid>
            
        
            <Grid item xs={6}>
            <Paper className={classes.paper}>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Typography variant="h4" style={{ color: "#212121" }}>
                        {authorName} 
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <div>
                        {membersArray.includes(user.uid) ? (
                            <Button  onClick = {handleLeave} className={classes.joinChatButton} variant="contained" color="primary" style={{ background: "#4db6ac" }}>Leave Listing</Button>
                        ) : (
                            <Button  onClick = {handleJoin} className={classes.joinChatButton} variant="contained" color="primary" style={{ background: "#4db6ac" }}>Join Listing</Button>
                        )}
                    </div>
                </div>
                
                <Typography variant="h4" style={{ color: "#212121" }}>
                    {listingTitle}
                </Typography>

                <a href={shopLink} target="_blank">{shopLink}</a>

                <br></br>
                <br></br>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Typography variant="h6" style={{ color: "#212121" }}>
                        Target order date:
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <Typography variant="h6">
                        {targetOrderDate}
                    </Typography>
                </div>

                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Typography variant="h6" style={{ color: "#212121" }}>
                        Target amount:
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <Typography variant="h6">
                    $ {minQty}
                    </Typography>
                </div>
                
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Typography variant="h6" style={{ color: "#212121" }}>
                        Location:
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <Typography variant="h6">
                        {location}
                    </Typography>
                </div>
               
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Typography variant="h6" style={{ color: "#212121" }}>
                        Number of members:
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <Typography variant="h6">
                        {members}
                    </Typography>
                </div>
                
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Typography variant="h6" style={{ color: "#212121" }}>
                        Number of kuppers:
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <Typography variant="h6">
                        {kuppers}
                    </Typography>
                </div>
                
                
                <Typography variant="h6" style={{ color: "#212121" }}>
                    Details:
                </Typography>
                <Typography variant="p" fontWeight="fontWeightBold">
                    {desc}
                </Typography>

            </Paper>
            </Grid>
        
        </Grid>
        </div>
  
    );
}

export default ListingDetails;