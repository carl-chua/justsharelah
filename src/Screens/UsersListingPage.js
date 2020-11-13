import React from "react";
import { Redirect, useHistory, useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { ConfirmCloseOrdersModal } from "../Components/ConfirmCloseOrdersModal";
import { useSelector } from "react-redux";
import { getListingById, closeOrdersForListing } from "../API/Listings";
import { getUserById, getUsername } from "../API/Users";

import {
  getOrderRecordsByListingId,
  getOrderRecordsByListingIdListener,
} from "../API/OrderRecord";
import OrderDialog from "../Components/OrderDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {},
  root: {
    flexGrow: 1,
  },
});

export default function UsersListingPage() {
  const classes = useStyles();
  const history = useHistory();
  const { listingId } = useParams();

  const userToken = useSelector((state) => state.userToken);
  const currentUser = useSelector((state) => state.currentUser);

  const [listing, setListing] = React.useState({});
  const [kupper, setKupper] = React.useState({});
  const [orderRecords, setOrderRecords] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const [
    showConfirmCloseOrdersModal,
    setShowConfirmCloseOrdersModal,
  ] = React.useState(false);

  function openConfirmCloseOrdersModal() {
    setShowConfirmCloseOrdersModal(true);
  }

  function closeConfirmCloseOrdersModal() {
    setShowConfirmCloseOrdersModal(false);
  }

  React.useEffect(() => {
    getListingById(listingId).then((listing) => {
      setListing(listing.data());
    });
  }, [listingId]);

  React.useEffect(() => {
    const unsubscribe = getOrderRecordsByListingIdListener(
      listingId,
      setOrderRecords
    );

    return unsubscribe;
  }, []);

  // React.useEffect(() => {
  //   orderRecords.forEach((orderRecord) => {
  //     getUsername(orderRecord[1].user).then((username) => {
  //       orderRecord[1].user = username;
  //     });
  //   });
  // }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // const getKupperUsername = (kupperId) => {
  //   getUserById(kupperId, setKupper);
  //   return kupper.username;
  // };

  return (
    <div>
      <Container maxWidth="lg">
        <Box align="left">
          <Link
            underline="hover"
            component="button"
            variant="body2"
            onClick={() => {
              // history.push("/myWallet");
              history.goBack();
            }}
          >
            <ArrowBackIcon />
            Back
          </Link>
        </Box>
        <Paper>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.head}>
                  <TableCell>Kuppers</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Payment Status</TableCell>
                </TableRow>
              </TableHead>
              {orderRecords.length > 0 ? (
                orderRecords.map((orderRecord) => (
                  <>
                    <TableBody>
                      <TableRow
                        key={orderRecord[0]}
                        hover
                        onClick={() => handleOpen()}
                      >
                        <TableCell component="th" scope="row">
                          {orderRecord[1].user}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(
                            1000 * orderRecord[1].date.seconds
                          ).toDateString()}
                        </TableCell>
                        <TableCell align="right">
                          {orderRecord[1].paymentStatus}
                        </TableCell>
                      </TableRow>
                      <OrderDialog
                        open={isOpen}
                        handleClose={handleClose}
                        orderRecord={orderRecord}
                      />
                    </TableBody>
                  </>
                ))
              ) : (
                <Typography align="centre" variant="h6" component="h6">
                  There are no kuppers at the moment!
                </Typography>
              )}
            </Table>
          </TableContainer>
        </Paper>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {!listing.isClosed ? (
            <button
              style={{
                backgroundColor: "#cc7f5d",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                overflow: "hidden",
                outline: "none",
                fontSize: "25px",
                marginTop: "18px",
                height: "48px",
                width: "280px",
                borderRadius: "5px",
              }}
              onClick={openConfirmCloseOrdersModal}
            >
              CLOSE ORDERS
            </button>
          ) : (
            <h3>Orders Closed!</h3>
          )}
        </div>
      </Container>
      <closeConfirmCloseOrdersModal
        show={showConfirmCloseOrdersModal}
        handleClose={closeConfirmCloseOrdersModal}
        listingId={listingId}
      />
    </div>
  );
}
