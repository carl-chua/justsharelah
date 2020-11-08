import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Moment from "moment";
import { getListingListener } from "../API/Listings";
import OrderCardModal from "./OrderCardModal";

export default function OrderRow({ order, handleOpenModal, filter }) {
  const [parentListing, setParentListing] = React.useState();

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
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

  function handleClose() {
      setShowModal(false);
  }

  return (parentListing && parentListing.title && parentListing.title.toLowerCase().includes(filter.toLowerCase())) ? (
    <TableRow key={order[0]} hover onClick={handleOnClick}>
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
        {order[1].hasPaid ? "Paid" : "Unpaid"}
      </TableCell>
    </TableRow>
  ): null;
}
