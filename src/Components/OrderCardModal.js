import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrderItems, getOrderItemsListener } from "../API/OrderRecord";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 300,
    margin: 20,
  },
  /*cardContainer: {
    background: "white",
    height: "100%",
    width: "25%",
    minWidth: 100,
    minHeight: 200,
    maxHeight: "auto",
    overflow: "scroll",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    maxWidth: "100%",
  },
  textRoot: {
    minHeight: "40vh",
    display: "flex",
    justifyContent: "start",
    alignContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },*/
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

  const [itemList, setItemList] = React.useState([])

  React.useEffect(() => {
    setItemList([])
    if(data) {
      getOrderItems(dataId, setItemList)
    }
  },[data])

  return  data ? (
    <Modal
      open={show}
      onClose={handleClose}
      style={{
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxHeight: "62%",
        overflow: "scroll",
        top: "20%",
        alignSelf: "center",
      }}
    >
      <Card
        className={styles.cardContainer}
      >
        <CardContent className={styles.cardContent}>
          <h2>{data.parentListing ? data.parentListing.title : ""}</h2>
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
              {itemList.length > 0 && itemList.map((item) => (
                  <TableRow
                    key={item[0]}
                  >
                    <TableCell component="th" scope="row">
                      {item[1].itemName}
                    </TableCell>
                    <TableCell align="right">
                      {item[1].itemQty}
                    </TableCell>
                    <TableCell align="right">
                      {item[1].itemPrice ? item[1].itemPrice : "-"}
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style = {{display : "flex", justifyContent : "flex-start", width : "100%", paddingLeft : 10, paddingRight : 10}}>
            <p>Total : {data.parentListing.price ? data.parentListing.price : "-"}</p>
          </div>
        </CardContent>
      </Card>
    </Modal>
  ) : null

}
