import React from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import { useSelector } from "react-redux";
import { getUserListing } from "../API/Listings";
import { Button, InputAdornment, TextField } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { getUserOrders } from "../API/OrderRecord";

import Moment from "moment";
import OrderRow from "../Components/OrderRow";
import OrderCardModal from "../Components/OrderCardModal";
import OrdersListing from "../Components/OrdersListing";
import UsersListings from "../Components/UsersListings";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {},
  root: {
    paddingTop: "2%",
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tabText: {
    fontSize: 25,
    fontWeight: "400",
  },
  tabDivider: {
    fontWeight: "lighter",
    fontSize: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
});

export default function WalletPage() {
  const styles = useStyles();
  let history = useHistory();
  const [view, setView] = React.useState(1);


  return (
    <Container maxWidth="lg" className={styles.root}>
      <div className={styles.tabBar}>
        <Button onClick={() => setView(1)}>
          <span
            className={styles.tabText}
            style={
              view === 1
                ? { textDecorationLine: "underline", fontWeight: "bold" }
                : {}
            }
          >
            MY LISTINGS
          </span>
        </Button>
        <span className={styles.tabDivider}>{"|"}</span>
        <Button onClick={() => setView(2)}>
          <span
            className={styles.tabText}
            style={
              view === 2
                ? { textDecorationLine: "underline", fontWeight: "bold" }
                : {}
            }
          >
            MY ORDERS
          </span>
        </Button>
      </div>
        {view == 2 ? <OrdersListing/> : <UsersListings/>}
    </Container>
  );
}

//<OrderCardModal show = {showModal} handleClose = {handleCloseModal} data = {modalData} dataId = {modalDataId}/>
