import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { loadUser } from "../API/CurrentUser";
import NavBar from "../Components/NavBar";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {},
  root: {
    flexGrow: 1,
  },
});

export default function UsersListingsPage({ history }) {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = React.useState({});
  const [value, setValue] = React.useState(0);

  function loadCurrentUser() {
    loadUser(setCurrentUser);
  }

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  if (currentUser === {}) {
    return <Redirect to="/login" />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function createData(a, b, c, d, e) {
    return { a, b, c, d, e };
  }

  const rows = [
    createData("Food delivery", "23/10/20", 10, 5, 0),
    createData("Clothes delivery", "23/10/20", 10, 5, 0),
    createData("Shoes delivery", "23/10/20", 10, 5, 0),
    createData("Food delivery", "23/10/20", 10, 5, 0),
  ];

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
    <div className="HomePage">
      <NavBar history={history} />
      <h2>My Listings</h2>

      <Container maxWidth="lg">
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
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.a}
                    </TableCell>
                    <TableCell align="right">{row.b}</TableCell>
                    <TableCell align="right">{row.c}</TableCell>
                    <TableCell align="right">{row.d}</TableCell>
                    <TableCell align="right">{row.e}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1}>
          Past Table
        </TabPanel>
      </Container>
    </div>
  );
}
