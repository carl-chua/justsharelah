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
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {},
  root: {
    flexGrow: 1,
  },
});

export default function UsersListingPage({ history }) {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = React.useState({});

  function loadCurrentUser() {
    loadUser(setCurrentUser);
  }

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  if (currentUser === {}) {
    return <Redirect to="/login" />;
  }

  function createData(a, b, c, d, e) {
    return { a, b, c, d, e };
  }

  const rows = [
    createData("John", "23/10/20", 10, 5, 0),
    createData("Joseph", "23/10/20", 10, 5, 0),
    createData("Rachel", "23/10/20", 10, 5, 0),
    createData("Tan", "23/10/20", 10, 5, 0),
  ];

  return (
    <div>
      <NavBar history={history} />
      <Link
        underline="hover"
        component="button"
        variant="body2"
        onClick={() => {
          alert("redirecting back to users listings page");
        }}
      >
        <ArrowBackIcon />
        Food Delivery
      </Link>

      <Container maxWidth="lg">
        <Paper>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.head}>
                  <TableCell>Buyer</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right"> Orders</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    hover
                    onClick={() => alert("redirecting...")}
                  >
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
        </Paper>
      </Container>
    </div>
  );
}
