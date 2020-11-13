import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import {
  getOrderItems,
  getOrderItemsListener,
  setOrderPayment,
} from "../API/OrderRecord";

import Dropzone from "./Dropzone";
import PhotoModal from "./PhotoModal";
import { deleteImages } from "../API/Storage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflow: "scroll",
    alignSelf: "center",
  },
  cardContainer: {
    width: "30%",
    minWidth: 350,
    maxWidth: 800,
    maxHeight: "100%",
    overflow: "scroll",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    overflow: "scroll",
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    fontWeight: "bold",
    border: "solid",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginBottom: 15,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  textInput: {
    marginBottom: 10,
  },
  dropzone: {
    width: "100%",
    height: 90,
    borderWidth: 2,
    borderColor: "8FBCAC",
    borderStyle: "dashed",
    borderRadius: 5,
  },
  button: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#CC7F5D",
    color: "white",
  },
}));

export default function OrderCardModal({
  show,
  handleClose,
  data,
  dataId,
  editable,
}) {
  const styles = useStyles();

  const alert = useAlert();

  const userToken = useSelector((state) => state.userToken);

  const [itemList, setItemList] = React.useState([]);

  const [isPhotoModal, setIsPhotoModal] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  const [url, setUrl] = React.useState();
  const [allUploads, setAllUploads] = React.useState([]);

  React.useEffect(() => {
    setItemList([]);
    setAllUploads([]);
    setUrl();
    if (data) {
      getOrderItems(dataId, setItemList);
      setUrl(data.order[1].receiptImage);
    }
  }, [data]);

  function handleClosePhotoModal() {
    setIsPhotoModal(false);
  }

  function handlePhotoModal(url) {
    setUrl(url);
    setIsPhotoModal(true);
  }

  async function handleSubmit() {
    let filter = allUploads.filter((file) => file[1] !== url);
    setAllUploads(filter);
    deleteImages(filter);
    let status = await setOrderPayment(dataId, url);
    if (status) {
      handleClose();
    } else {
      alert("Error submitting payment. please try again");
    }
  }

  const handleCloseModal = (e) => {
    deleteImages(allUploads);
    setAllUploads([]);
    setUrl();
    handleClose(e);
  };

  return data ? (
    <div>
      <Modal open={show} onClose={handleCloseModal} className={styles.root}>
        <Card className={styles.cardContainer}>
          <CardContent className={styles.cardContent}>
            <div style={{ maxHeight: 500, width: "100%", paddingBottom: 20 }}>
              <h2 style={{ textAlign: "center" }}>
                {data.parentListing ? data.parentListing.title : ""}
              </h2>
              <TableContainer>
                <Table className={styles.table} aria-label="simple table">
                  <TableHead>
                    <TableRow className={styles.head}>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemList.length > 0 &&
                      itemList.map((item) => (
                        <TableRow key={item[0]}>
                          <TableCell component="th" scope="row">
                            {item[1].itemName}
                          </TableCell>
                          <TableCell align="right">{item[1].itemQty}</TableCell>
                          <TableCell align="right">
                            {item[1].itemPrice ? item[1].itemPrice : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingLeft: 10,
                  paddingRight: 20,
                }}
              >
                <p>Total : {data.order[1].price ? data.order[1].price : "-"}</p>
                <p>{`Delivery Fee : ${
                  data.order[1].deliveryFee ? data.order[1].deliveryFee : 0
                }`}</p>
              </div>
              <Dropzone
                handlePhotoModal={handlePhotoModal}
                url={url}
                setUrl={setUrl}
                setAllUploads={setAllUploads}
                setIsUploading={setIsUploading}
                disabled={
                  data.order[1].paymentStatus === "PAID" ||
                  data.order[1].price <= 0
                }
              />
            </div>
          </CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 20,
            }}
          >
            {data.order[1].paymentStatus !== "PAID" ? (
              <Button
                className={styles.button}
                onClick={handleSubmit}
                disabled={
                  (isUploading === true ||
                  (data.order[1].receiptImage
                    ? (data.order[1].receiptImage === url)
                    : !url) ||
                  data.order[1].price <= 0)
                }
              >
                {data.order[1].price > 0 ? "SEND PAYMENT" : "NO PRICE"}
              </Button>
            ) : (
              <h3>PAYMENT CONFIRMED</h3>
            )}
          </div>
        </Card>
      </Modal>
      <PhotoModal
        show={isPhotoModal}
        handleClose={handleClosePhotoModal}
        url={url}
      />
    </div>
  ) : null;
}
