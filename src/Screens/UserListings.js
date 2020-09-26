import { Grid, Box, Button, GridList} from "@material-ui/core";
import React from "react";

import firebase from "../API/Firebase";

import UserCard from "../Components/UserCard"
import { makeStyles, useTheme } from '@material-ui/core/styles';


import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListingList from "../Components/ListingList";


const useStyles = makeStyles({
    root : {
        display : "flex",
        marginTop : "5%",
        marginLeft : "5%",
        marginRight : "5%",
    },
    tabContainer : {
        height: "80vh", 
        overflow: "auto",
        borderRadius : 16,
        borderColor : "#BEBEBE",
    },
    lowerCase : {
        fontSize: 26,
        textTransform : 'none',
    },
    tabBar : {
        justifyContent : "flex-start",
        alignItems : "center",
        textAlign : "start",
    },

    tabBarText : {
        textAlign : "start",
        fontSize : 36,
        paddingLeft : "5%"
    },                       
    listingList : {
        display : "flex",
        flexWrap : "wrap",
        overflow : "auto",
        paddingLeft : "2.5%"
    },
    noListText : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        height : "80%",
        color : "grey",
    },
})

const dummyData = [
    {
        id : 1,
        title: "First Listing",
        description : "Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood",
        date : new Date(),
        minOrder : 200,
        buyers : 3,
        
    },
    {
        id : 2,
        title: "2 Listing",
        description : "Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood",
        date : new Date(),
        minOrder : 200,
        buyers : 3,
        
    },
    {
        id : 2,
        title: "3 Listing",
        description : "Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood",
        date : new Date(),
        minOrder : 200,
        buyers : 3,
        
    },
    {
        id : 4,
        title: "4 Listing",
        description : "Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood Lai come buy pls, asos cheapcheap goodgood",
        date : new Date(),
        minOrder : 200,
        buyers : 3,
        
    }
]

export default function UserListings() {

    const styles = useStyles()
    
    const[view, setView] = React.useState(1)

    return(
        <Box className = {styles.root}>
            <Grid
                container
                xs={12}
                direction-xs-column
                justify = "center"
                direction = "row"
                spacing = {5}
            >
                <Grid
                    item
                    xs= {12}
                    md = {3}
                >
                    <Box
                        display = "flex"
                        justifyContent = "center"
                        alignContent = "center"
                    >
                        <UserCard user={{name: "John Doe", city: "Singapore"}}/>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs= {12}
                    md = {9}
                >
                    <Box className = {styles.tabBar}>
                        <Button 
                            size="small" 
                            onClick = {() => setView(1)}
                        >
                            <span
                                className = {styles.lowerCase}
                                style = {view == 1 ? {textDecorationLine:"underline"} : {}}
                            >
                                Listings
                            </span>
                        </Button>
                        <Button size="small" onClick = {() => setView(2)}>
                            <span
                                className = {styles.lowerCase}
                                style = {view == 2 ? {textDecorationLine:"underline"} : {}}
                            >
                                Reviews
                            </span>
                        </Button> 
                    </Box>
                    <Box
                        m = {1}
                        border = {1}
                        bgcolor = "background-paper"
                        className = {styles.tabContainer}
                    >
                        <p className = {styles.tabBarText}>
                            {view == 1 ? "Listings" : "Reviews"}
                        </p>
                        
                        {view == 1 ?
                            <ListingList dataList = {dummyData} colSize = {3}/>
                        :
                        null
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}