import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { getOrderItems, getUserOrders } from "../API/OrderRecord";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default function OrderDialog({ open, handleClose, orderRecord }) {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);
  const [values, setValues] = React.useState({});

  React.useEffect(() => {
    getOrderItems(orderRecord[0], setItems);
  }, []);

  const handleChange = (itemId, event) => {
    setValues({ ...values, [itemId]: event.target.value });
    console.log(values);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{orderRecord[1].user}</DialogTitle>
      <DialogContent>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 &&
              items.map((item) => (
                <TableRow key={item[0]}>
                  <TableCell component="th" scope="row">
                    {item[1].itemName}
                  </TableCell>
                  <TableCell align="right">{item[1].itemQty}</TableCell>
                  <TableCell align="right">
                    <OutlinedInput
                      value={item[1].price}
                      onChange={(event) => handleChange(item[0], event)}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      labelWidth={60}
                    />
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell component="th" scope="row">
                Delivery Fee
              </TableCell>
              <TableCell align="right">-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        {orderRecord[1].paymentStatus === "unpaid" ? (
          <Button onClick={handleClose} color="primary">
            Send Payment Request
          </Button>
        ) : (
          <Button onClick={handleClose} color="primary">
            Verify Payment
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
