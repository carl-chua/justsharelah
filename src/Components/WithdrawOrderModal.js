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
import { deleteOrderRecord, getOrderRecordItems } from "../API/OrderRecord";
import "../Styles/WithdrawOrderModal.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

function WithdrawOrderModal({ show, handleClose, orderRecord }) {
  const alert = useAlert();
  const styles = useStyles();
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));

  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();

  const [items, setItems] = useState([]);

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  useEffect(() => {
    if (!isEmpty(orderRecord)) {
      getOrderRecordItems(orderRecord[0]).then((querySnapshot) => {
        var temp = [];
        querySnapshot.forEach((doc) => {
          var item = {
            itemName: doc.data().itemName,
            itemQty: doc.data().itemQty,
          };

          temp.push(item);
        });
        setItems(temp);
      });
    }
  }, [orderRecord]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    async function deleteOrder() {
      let result = await deleteOrderRecord(orderRecord[0]);
      if (result) {
        alert.show("Order withdrawn successfully");
        handleClose();
      } else {
        console.log("Failed to withdraw order");
      }
    }

    deleteOrder();
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
              Withdraw Order
            </h1>
          </CardContent>

          <div className="WarningMessage">
            <h2>Are you sure you want to withdraw your order?</h2>
          </div>

          <form className="WithdrawOrderModalForm" onSubmit={handleSubmit}>
            {/*<div className="Item">
              <h3 style={{ paddingLeft: "28%" }}>Item</h3>
              <h3 style={{ paddingLeft: "28%" }}>Quantity</h3>
            </div>
            <CardContent className={styles.cardContent}>
              {items.map((item, iId) => (
                <div key={iId} className="Item">
                  <h3 style={{ paddingLeft: "28%" }}>{item.itemName}</h3>
                  <h3 style={{ paddingLeft: "28%" }}>{item.itemQty}</h3>
                </div>
              ))}
              </CardContent>*/}
            <TableContainer component={Paper}>
              <Table className={styles.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h3 style={{ margin: "0px" }}>Item</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3 style={{ margin: "0px" }}>Quantity</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, iId) => (
                    <TableRow key={iId}>
                      <TableCell component="th" scope="row">
                        {item.itemName}
                      </TableCell>
                      <TableCell align="right">{item.itemQty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export default WithdrawOrderModal;
