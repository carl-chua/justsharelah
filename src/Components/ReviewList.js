import React from 'react'
import { GridList, Box } from "@material-ui/core";
import ReviewCard from "./ReviewCard";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
    reviewList : {
        display : "flex",
        flexWrap : "wrap",
        overflow : "auto",
        paddingLeft : "2.5%",
        paddingRight : "2.5",
    },
    noListText : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        height : "80%",
        color : "grey",
    },
})

export default function ReviewList({dataList}) {
    const styles = useStyles();
    const theme = useTheme();
    const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        dataList.length > 0 ?
        <GridList 
            cols = {1}
            className = {styles.reviewList}
            style = {{
                justifyContent : `${isNotSmallScreen ? "start" : "center"}`,
            }}
        >
            {dataList.map(data => (
                <ReviewCard key ={data[0]} data = {data[1]}/>
            ))}
        </GridList>
        :
        <Box
            className = {styles.noListText}
        >
            <p>User has no Reviews</p>
        </Box>
    )
}