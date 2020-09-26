import React from 'react'
import { GridList, Box } from "@material-ui/core";
import ListingCard from "./ListingCard";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
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

export default function ListingList({colSize, dataList}) {
    const styles = useStyles();
    const theme = useTheme();
    const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        dataList.length > 0 ?
        <GridList 
            cols = {colSize}
            className = {styles.listingList}
            style = {{
                justifyContent : `${isNotSmallScreen ? "start" : "center"}`,
            }}
        >
            {dataList.map(data => (
                <ListingCard data = {data}/>
            ))}
        </GridList>
        :
        <Box
            className = {styles.noListText}
        >
            <text>User has no Listings</text>
        </Box>
    )
}