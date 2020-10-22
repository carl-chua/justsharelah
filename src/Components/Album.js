import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import "../Styles/Album.css";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: "flex",
    justify: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cardStyle = {
  display: "flex",
  flexDirection: "column",
};

const gridStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

export default function Album(data) {
  const classes = useStyles();

  return (
    <div className="Album">
      <React.Fragment>
        <CssBaseline />
        <main>
          <Card className={classes.card}>
            <Container className={classes.cardGrid} maxWidth="lg">
              <Grid style={gridStyle} container spacing={4}>
                {data.listings.map((listing) => (
                  <Grid
                    item
                    key={listing[0]}
                    justify="space-between"
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <div className="Card">
                      <Card style={cardStyle}>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {listing.listingTitle}
                          </Typography>
                          <Typography>{listing.desc}</Typography>
                          <Typography>
                            Minimum Quantity: {listing.minQty}
                          </Typography>
                          <Typography>#{listing.listingTags}</Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Card>
        </main>
      </React.Fragment>
    </div>
  );
}
