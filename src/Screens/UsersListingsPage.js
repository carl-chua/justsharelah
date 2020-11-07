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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {},
  root: {
    flexGrow: 1,
  },
});

export default function UsersListingsPage() {
  const classes = useStyles();
  let history = useHistory();

  const userToken = useSelector((state) => state.userToken);
  const currentUser = useSelector((state) => state.currentUser);

  const [value, setValue] = React.useState(0);
  const [usersListings, setUsersListings] = React.useState([]);

  // console.log(userToken);
  // console.log(currentUser);

  React.useEffect(() => {
    getUserListing(userToken).then((listings) => {
      setUsersListings(listings);
    });
  }, [userToken]);

  console.log(usersListings);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    alert("hi");
  };

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
    <div>
      <h2>My Listings</h2>

      <Container maxWidth="lg">
        <Paper>
          <form>
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
          </form>

          <AppBar position="static">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Ongoing" />
              <Tab label="Past" />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.head}>
                    <TableCell>Listing Title</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Number of Orders</TableCell>
                    <TableCell align="right">Payments Received</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersListings.map((listing) => (
                    <TableRow
                      key={listing[0]}
                      hover
                      onClick={() => {
                        history.push("/usersListingPage/" + listing[0]);
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {listing[1].title}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(
                          1000 * listing[1].createdDate.seconds
                        ).toDateString()}
                      </TableCell>
                      <TableCell align="right">
                        {listing[1].orderRecords.length}
                      </TableCell>
                      <TableCell align="right">
                        {listing[1].orderRecords.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.head}>
                    <TableCell>Listing Title</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Number of Orders</TableCell>
                    <TableCell align="right">Payments Received</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersListings.map((listing) => (
                    <TableRow
                      key={listing[0]}
                      hover
                      onClick={() => alert("redirecting...")}
                    >
                      <TableCell component="th" scope="row">
                        {listing[1].title}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(
                          1000 * listing[1].createdDate.seconds
                        ).toDateString()}
                      </TableCell>
                      <TableCell align="right">
                        {listing[1].orderRecords.length}
                      </TableCell>
                      <TableCell align="right">
                        {listing[1].orderRecords.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Paper>
      </Container>
    </div>
  );
}
