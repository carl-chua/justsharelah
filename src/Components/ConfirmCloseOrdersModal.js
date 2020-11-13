import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Input,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { closeOrdersForListing } from "../API/Listings";
import "../Styles/WithdrawOrderModal.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cardContainer: {
    background: "linear-gradient(to bottom, #7AA18A 70px, white 10%, white)",
    minWidth: 750,
    minHeight: 300,
    paddingLeft: "1%",
    paddingRight: "1%",
    maxHeight: "auto",
    borderRadius: "2%",
    border: "1px solid #BEBEBE",
    boxShadow: "-10px 10px 4px rgba(0, 0, 0, 0.05)",
  },
  cardContentHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space",
    alignItems: "center",
    padding: 0,
    width: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space",
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

export default function ConfirmCloseOrdersModal({
  show,
  handleClose,
  listingId,
}) {
  const alert = useAlert();
  const styles = useStyles();
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));

  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();

  const handleSubmit = () => {
    closeOrdersForListing(listingId);
    handleClose();
    alert.show("Orders successfully closed!");
  };

  return (
    <div className="WithdrawOrderModal">
      <Modal
        open={show}
        onClose={handleClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "300",
          margin: "auto",
          alignSelf: "center",
          overflowY: "scroll",
        }}
      >
        <Card className={styles.cardContainer}>
          <CardContent className={styles.cardContentHeader}>
            <h1
              style={{
                marginTop: "15px",
                color: "#ffffff",
              }}
            >
              Confirm
            </h1>
          </CardContent>
          <div className="WarningMessage">
            <h2>Are you sure you want to close orders?</h2>
          </div>
          <form className="WithdrawOrderModalForm" onSubmit={handleSubmit}>
            <div className="ConfirmButtonDiv">
              <button className="CancelButton" onClick={handleClose}>
                <h2>CANCEL</h2>
              </button>
              <button className="ConfirmButton" type="submit">
                <h2>CONFIRM</h2>
              </button>
            </div>
          </form>
        </Card>
      </Modal>
    </div>
  );
}
