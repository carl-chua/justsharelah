import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import { addReview } from "../API/Reviews";

const useStyles = makeStyles({
  cardContainer: {
    background: "linear-gradient(to bottom, #FFD076 30%, white 20%, white)",
    minWidth: 300,
    minHeight: 400,
    paddingLeft: "5%",
    paddingRight: "5%",
    maxHeight: "auto",
    borderRadius: "8%",
    border: "1px solid #BEBEBE",
    boxShadow: "-10px 10px 4px rgba(0, 0, 0, 0.05)",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space",
    alignItems: "center",
    paddingTop: "15%",
    padding: 0,
    width: "100%",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 40,
    margin: 0,
  },
  ratingBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    marginTop: "10%",
    backgroundColor: "#CC7F5D",
    color: "white",
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
  },
});

const labels = {
  0.5: "0.5",
  1: "1.0",
  1.5: "1.5",
  2: "2.0",
  2.5: "2.5",
  3: "3.0",
  3.5: "3.5",
  4: "4.0",
  4.5: "4.5",
  5: "5.0",
};

export default function CreateReviewModal({ show, handleClose, user }) {
  const styles = useStyles();

  const [rating, setRating] = React.useState(5);
  const [hover, setHover] = React.useState(-1);

  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [comment, setComment] = React.useState();

  const userToken = useSelector(state => state.userToken)

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  async function handleSubmit() {
    let data = {
        reviewer : userToken,
        reviewee : user[0],
        message : comment,
        numStars : rating,
    }
    let submitStatus = await addReview(data);
    if(submitStatus) {
        setRating(5);
        setHover(-1);
        setComment();
        handleClose();
    } else {
        console.log("Error creating review");
    }
  }

  return (
    <Modal
      open={show}
      onClose={handleClose}
      style={{
        display: "flex",
        position: "absolute",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        maxHeight: "60%",
        top: "20%",
        left: isNotSmallScreen ? "40%" : "16%",
        alignSelf: "center",
      }}
    >
      <Card className={styles.cardContainer}>
        <CardContent className={styles.cardContent}>
          <Avatar
            src={user[1].imageUrl}
            style={{
              width: 100,
              height: 100,
            }}
          >
            <span style={{ fontSize: "300%" }}>
              {user[1].username ? user[1].username.charAt(0).toUpperCase() : ""}
            </span>
          </Avatar>
          <p className={styles.nameText}>{user[1].username}</p>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Rating
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {rating !== null && (
              <Box ml={1}>{labels[hover !== -1 ? hover : rating]}</Box>
            )}
          </Box>
          <TextField
            label="Comment"
            multiline
            rows={6}
            placeholder={`How was your experience with ${user[1].username}?`}
            value={comment}
            onChange={handleCommentChange}
            fullWidth={true}
          />
          <Button 
            className = {styles.submitButton}
            onClick = {handleSubmit}
            disabled = {!rating}
          >Submit</Button>
        </CardContent>
      </Card>
    </Modal>
  );
}
