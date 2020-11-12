import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Moment from "moment";
import { getListingListener } from "../API/Listings";
import OrderCardModal from "./OrderCardModal";
import { ClickAwayListener } from "@material-ui/core";

export default function OrderRow({ order, handleOpenModal, filter }) {
  const [parentListing, setParentListing] = React.useState();

  const [showModal, setShowModal] = React.useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  React.useEffect(() => {
    console.log("orderrow refiring")
    const unsubscribe = getListingListener(
      order[1].listingId,
      setParentListing
    );

    return unsubscribe;
  }, []);

  function handleOnClick() {
    let data = {
        order : order,
        parentListing : parentListing,
    }
    handleOpenModal(data, order[0])
    setShowModal(true)
  }

  const handleClose = (e) => {
    if(e) {
      e.stopPropagation();
      e.preventDefault();
    }
      setShowModal(false);
  }

  function handleOpen() {
    setShowModal(true)
  }

  return (parentListing && parentListing.title && parentListing.title.toLowerCase().includes(filter.toLowerCase())) ? (
    <TableRow key={order[0]} hover onClick={handleOpen}>
      <TableCell component="th" scope="row">
        {parentListing ? parentListing.title : ""}
      </TableCell>
      <TableCell align="right">
        {Moment(order[1].date.toDate()).format("DD MMM YYYY")}
      </TableCell>
      <TableCell align="right">
        {order[1].price ? order[1].price : "-"}
      </TableCell>
      <TableCell align="right">
        {order[1].paymentStatus ? order[1].paymentStatus : "Unpaid"}
      </TableCell> 
      <OrderCardModal show = {showModal} handleClose = {handleClose} data = {{order : order, parentListing: parentListing}} dataId = {order[0]}/>
    </TableRow>
  ): null;
}
//