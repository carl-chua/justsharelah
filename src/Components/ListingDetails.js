import React from "react";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../API/Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { useParams } from "react-router";
import Rating from "@material-ui/lab/Rating";
import { getReviews } from "../API/Reviews";
import { Avatar } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import PhotoModal from "./PhotoModal";
import { useSelector } from "react-redux";
import { getOrderRecordByListingIdAndUserId } from "../API/OrderRecord";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 500,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: 500,
    //maxheight: "100%"
  },

  joinChatButton: {
    margin: theme.spacing(3),
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

  desText: {
    fontSize: 16,
    color: "gray",
    margin: 0,
  },
}));

const ListingDetails = () => {
  const classes = useStyles();
  var [listingTitle, setListingTitle] = React.useState("");
  var [listingTags, setListingTags] = React.useState("");
  var [targetOrderDate, setTargetOrderDate] = React.useState("");
  var [minQty, setMinQty] = React.useState("");
  var [desc, setDesc] = React.useState("");
  var [shopLink, setShopLink] = React.useState("");
  var [img, setImg] = React.useState("");
  var [location, setLocation] = React.useState("");
  var [category, setCategory] = React.useState("");
  var [authorName, setAuthorName] = React.useState("");
  var [photo, setPhoto] = React.useState("");
  var [imgUrl, setImgUrl] = React.useState("");
  var [members, setMembers] = React.useState("");
  var [orderRecords, setOrderRecords] = React.useState("");
  var [membersArray, setMembersArray] = React.useState([]);
  var [orderRecordsArray, setOrderRecordsArray] = React.useState([]);
  var [chatGroup, setChatGroup] = React.useState("");
  var [createdDate, setCreatedDate] = React.useState(new Date());
  var [rating, setRating] = React.useState(0.0);
  var [listingOwner, setListingOwner] = React.useState("");
  var [reviews, setReviews] = React.useState([]);
  var [button, setButton] = React.useState();
  var [profileUrl, setProfileUrl] = React.useState("");
  var [numReviews, setNumReviews] = React.useState("");
  var [isClosed, setIsClosed] = React.useState(false);
  var [orderSize, setOrderSize] = React.useState(0);
  let user = firebase.auth().currentUser;
  //get listing id from params
  let { id } = useParams();
  var listingId = id;

  const userToken = useSelector(state => state.userToken)

  async function handleLeave() {
    //const index = membersArray.indexOf(userToken);
    //remove user id from members
    //if (index > -1) {
    // membersArray.splice(index, 1);
    //}
    //console.log(membersArray);
    //update db
    //var listingRef = firebase.firestore().collection("listings").doc(id);
    //return listingRef.update({
    //members: firebase.firestore.FieldValue.arrayRemove(userToken),
    //})
    var listingRef = firebase.firestore().collection("listings").doc(id);
    var chatGroupRef = firebase
      .firestore()
      .collection("chatGroups")
      .doc(chatGroup);
    try {
      await firebase.firestore().runTransaction(async (tn) => {
        tn.update(listingRef, {
          members: firebase.firestore.FieldValue.arrayRemove(userToken),
        });
        tn.update(chatGroupRef, {
          members: firebase.firestore.FieldValue.arrayRemove(userToken),
        });

        //alert("Left listing!");

        return true;
      });
    } catch (err) {
      console.log("TRANSACTION FAILED");
      console.log(err);
      return false;
    }
  }

  async function handleJoin() {
    //membersArray.push(userToken);

    //update db
    //var listingRef = firebase.firestore().collection("listings").doc(id);
    //return listingRef.update({
    //members: firebase.firestore.FieldValue.arrayUnion(userToken),
    //})
    var listingRef = firebase.firestore().collection("listings").doc(id);
    var chatGroupRef = firebase
      .firestore()
      .collection("chatGroups")
      .doc(chatGroup);
    try {
      await firebase.firestore().runTransaction(async (tn) => {
        tn.update(listingRef, {
          members: firebase.firestore.FieldValue.arrayUnion(userToken),
        });
        tn.update(chatGroupRef, {
          members: firebase.firestore.FieldValue.arrayUnion(userToken),
        });

        //alert("Joined listing!");

        return true;
      });
    } catch (err) {
      console.log("TRANSACTION FAILED");
      console.log(err);
      return false;
    }
  }

  function loadData() {
    //enter listing id for doc
    firebase
      .firestore()
      .collection("listings")
      .doc(id)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          //alert("getting data once");
          setListingTitle(doc.data().title);
          setCategory(doc.data().category);
          setListingTags(doc.data().tags);
          setLocation(doc.data().location);
          setMinQty(doc.data().targetAmount);
          setDesc(doc.data().description);
          setTargetOrderDate(doc.data().targetOrderDate);
          setShopLink(doc.data().websiteLink);
          setPhoto(doc.data().photo);
          setMembers(doc.data().members.length);
          setOrderRecords(doc.data().orderRecords.length);
          setMembersArray(doc.data().members);
          setOrderRecordsArray(doc.data().orderRecords);
          setChatGroup(doc.data().chatGroup);
          setCreatedDate(doc.data().createdDate);
          setListingOwner(doc.data().listingOwner);
          setIsClosed(doc.data().isClosed);
          // Create a reference to the file we want to download
          const storageRef = firebase.storage().ref();
          var photoRef = storageRef.child("image").child(doc.data().photo);

          // Get the download URL
          photoRef
            .getDownloadURL()
            .then(function (url) {
              setImgUrl(url);
            })
            .catch(function (error) {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case "storage/object-not-found":
                  // File doesn't exist
                  alert("File doesn't exist");
                  break;

                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  alert("User doesn't have permission to access the object");
                  break;

                case "storage/canceled":
                  // User canceled the upload
                  alert("User canceled the upload");
                  break;

                case "storage/unknown":
                  // Unknown error occurred, inspect the server response
                  //alert("Unknown error occurred/no listing photo uploaded");
                  break;
              }
            });
          //get username of post author
          firebase
            .firestore()
            .collection("users")
            .doc(doc.data().listingOwner)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                setAuthorName(doc.data().username);
                //get profile pic if any
                if (doc.data().imageUrl) {
                  const storageRef2 = firebase.storage().ref();
                  var photoRef2 = storageRef2
                    .child("image")
                    .child(doc.data().imageUrl);

                  // Get the download URL
                  photoRef2.getDownloadURL().then(function (url) {
                    setProfileUrl(url);
                  });
                }
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                alert("No such document!");
              }
            })
            .catch(function (error) {
              console.log("No profile pic, Error getting document:", error);
              //alert("Error getting document/no profile photo");
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          alert("No such document!");
        }
      });

      getOrderRecordByListingIdAndUserId(id, userToken).then(snap => {
        setOrderSize(snap.size) // will return the collection size
     });;
  }

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    getReviews(listingOwner, setReviews);
    let total = 0.0;

    if (reviews.length > 0) {
      total = reviews.reduce((a, b) => a + b[1].numStars, 0.0) / reviews.length;
    }

    setNumReviews(reviews.length);
    setRating(total);
  }, [reviews]);

  const history = useHistory();

  const[showPhotoModal, setShowPhotoModal] = React.useState(false);

  function handlePhotoModal() {
    setShowPhotoModal(true)
  }

 

  function handleCategoryClick(category) {
    if (firebase.auth().currentUser != null) {
      history.push(`/categories/${category}`);
    }
  }

  function handleProfileClick(authorName) {
    if (firebase.auth().currentUser != null) {
      history.push(`/user/${authorName}`);
    }
  }

  return (
    <div className={classes.root} >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardActionArea onClick={handlePhotoModal}>
              <CardMedia
                className={classes.media}
                image={imgUrl}
                title="Listing photo"
              />
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Avatar
                src={profileUrl}
                style={{
                  width: 50,
                  height: 50,
                }}
              ></Avatar>
              &nbsp; &nbsp;
              <Tooltip title="Click to view profile page" arrow>
                
                    <Link
                        onClick={() => handleProfileClick(authorName)}
                        style={{
                        textDecoration: "none",
                        color: "#212121",
                        fontSize: "50px",
                        }}
                    >
                  {authorName}
                  </Link>
                
              </Tooltip>
              &nbsp; &nbsp;
              <div>
              {isClosed  ? (
                 <h6>Listing is closed!</h6>
                ) : (
                  ""
                )}
                {!isClosed && userToken !== listingOwner &&
                membersArray.includes(userToken) &&
                orderSize == 0 ? (
                  <Button
                    onClick={handleLeave}
                    className={classes.joinChatButton}
                    variant="contained"
                    color="primary"
                    style={{ background: "#4db6ac" }}
                  >
                    Leave Listing
                  </Button>
                ) : (
                  ""
                )}
                {!isClosed && userToken !== listingOwner &&
                !membersArray.includes(userToken) &&
                 orderSize == 0 ? (
                  <Button
                    onClick={handleJoin}
                    className={classes.joinChatButton}
                    variant="contained"
                    color="primary"
                    style={{ background: "#4db6ac" }}
                  >
                    Join Listing
                  </Button>
                ) : (
                  ""
                )}
                {!isClosed && userToken !== listingOwner &&
                orderSize > 0 ? (
                  <Button
                    disabled="true"
                    className={classes.joinChatButton}
                    variant="contained"
                    color="primary"
                    style={{ background: "#A9A9A9" }}
                  >
                    Leave Listing
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Rating value={rating} readOnly={true} precision={0.5} />
              &nbsp;
              <p>{numReviews} Review(s)</p>
            </div>
            <Typography variant="h5" style={{ color: "#212121" }}>
              {listingTitle}
            </Typography>
            <Typography variant="p" style={{ color: "#4db6ac" }}>
              Category:{" "}
              <Link
                onClick={() => handleCategoryClick(category)}
                style={{
                  textDecoration: "none",
                  color: "#212121",
                }}
              >
                {category}
              </Link>
            </Typography>
            <br></br>
            <a href={shopLink} target="_blank" rel="noopener noreferrer">
              {shopLink}
            </a>
            <br></br>
            <br></br>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="p" style={{ color: "#212121" }}>
                Target order date:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="p">{targetOrderDate}</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="p" style={{ color: "#212121" }}>
                Target amount:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="p">$ {minQty}</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="p" style={{ color: "#212121" }}>
                Location:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="p">{location}</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="p" style={{ color: "#212121" }}>
                Number of members:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="p">{members}</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="p" style={{ color: "#212121" }}>
                Number of kuppers:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="p">{orderRecords}</Typography>
            </div>
            <Typography variant="p" style={{ color: "#212121" }}>
              Details:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="p" fontWeight="fontWeightBold">
              {desc}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <PhotoModal show={showPhotoModal} handleClose = {() => setShowPhotoModal(false)} url = {imgUrl}/>
    </div>
  );
};

export default ListingDetails;
