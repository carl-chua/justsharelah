import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import firebase from "../API/Firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Input,
} from "@material-ui/core";
import { sizing } from "@material-ui/system";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "../Styles/CreateOrderModal.css";
import { useAlert } from "react-alert";
import { editOrder, getOrderRecordItems } from "../API/OrderRecord";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles({
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

function EditOrderModal({ show, handleClose, orderRecord }) {
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

  function handleItemNameChange(id, evt) {
    (() => {
      const newItems = items.map((item, iId) => {
        if (id !== iId) return item;
        return { ...item, itemName: evt.target.value };
      });

      setItems(newItems);
    })();
  }

  function handleItemQtyChange(id, evt) {
    (() => {
      const newItems = items.map((item, iId) => {
        if (id !== iId) return item;
        return { ...item, itemQty: evt.target.value };
      });

      setItems(newItems);
    })();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var itemList = [];
    var quantityList = [];

    items.map((item) => {
      itemList.push(item.itemName);
      quantityList.push(item.itemQty);
    });

    async function updateOrder() {
      let result = await editOrder(items, orderRecord[0], currentUser.username);
      if (result) {
        alert.show("Order edited successfully!");
        //history.push("/");
        handleClose();
      } else {
        console.log("Failed to edit order");
      }
    }

    updateOrder();
  };

  function handleAddItem() {
    setItems(items.concat([{ itemName: "", itemQty: "" }]));
  }

  function handleRemoveItem(id) {
    setItems(items.filter((i, iId) => id !== iId));
  }

  return (
    <div className="CreateOrderModal">
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
              EDIT ORDER
            </h1>
          </CardContent>

          <form className="CreateOrderModalForm" onSubmit={handleSubmit}>
            <CardContent className={styles.cardContent}>
              {items.map((item, iId) => (
                <div key={iId} className="Item">
                  <Input
                    className="ItemNameInput"
                    type="text"
                    placeholder={`Item ${iId + 1}`}
                    value={item.itemName}
                    onChange={(evt) => handleItemNameChange(iId, evt)}
                    style={{ width: "600px" }}
                  />
                  <Input
                    className="ItemQtyInput"
                    type="text"
                    placeholder="Qty"
                    value={item.itemQty}
                    onChange={(evt) => handleItemQtyChange(iId, evt)}
                    style={{ width: "70px" }}
                  />
                  <button
                    className="RemoveItemButton"
                    type="button"
                    onClick={() => handleRemoveItem(iId)}
                  >
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>X</p>
                  </button>
                </div>
              ))}
            </CardContent>
            <button
              className="AddItemButton"
              type="button"
              onClick={handleAddItem}
            >
              <p
                style={{
                  color: "#67776D",
                  textDecoration: "underline",
                  fontSize: "15px",
                }}
              >
                + Add Item
              </p>
            </button>
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

export default EditOrderModal;
