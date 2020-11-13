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

export default function OrdersListing() {
  const styles = useStyles();

  const userToken = useSelector((state) => state.userToken);

  const [searchString, setSearchString] = React.useState("");

  const [orders, setOrders] = React.useState([]);

  const [showModal, setShowModal] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  React.useEffect(() => {
    const unsubscribe = getUserOrders(userToken, setOrders);

    return unsubscribe;
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper>
      <AppBar
        position="static"
        style={{
          backgroundColor: "white",
          boxShadow: "none",
          paddingRight: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            style={{ paddingTop: 20 }}
          >
            <Tab label="Ongoing" />
            <Tab label="Past" />
          </Tabs>
          <TextField
            placeholder="Search"
            value={searchString}
            onChange={handleChangeSearch}
            style={{ width: "30%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled" />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </AppBar>

      <TabPanel value={value} index={0}>
        <TableContainer component={Paper} style={{ maxHeight: "70%" }}>
          <Table
            stickyHeader
            className={styles.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow className={styles.head}>
                <TableCell>Listing Title</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                ? orders
                    .filter((order) => order[1].paymentStatus !== "PAID")
                    .map((order) => (
                      <OrderRow
                        key={order[0]}
                        order={order}
                        filter={searchString}
                      />
                    ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TableContainer component={Paper} style={{ maxHeight: "70%" }}>
          <Table
            stickyHeader
            className={styles.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow className={styles.head}>
                <TableCell>Listing Title</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                ? orders
                    .filter((order) => order[1].paymentStatus === "PAID")
                    .map((order) => (
                      <OrderRow
                        key={order[0]}
                        order={order}
                        filter={searchString}
                      />
                    ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Paper>
  );
}
