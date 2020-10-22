import React from 'react'
import { GridList, Box } from "@material-ui/core";
import ListingCard from "./ListingCard";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserListCard from './UserListCard';

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

export default function UserList({dataList, title}) {
    const styles = useStyles();
    const theme = useTheme();
    const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        dataList && dataList.length > 0  ?
        <GridList 
            cols = {1}
            className = {styles.listingList}
            style = {{
                justifyContent : `${isNotSmallScreen ? "start" : "center"}`,
            }}
        >
            {dataList.map(data => (
                <UserListCard key={data} data={data}/>  
            ))}
        </GridList>
        :
        <Box
            className = {styles.noListText}
        >
            <p>User has no {title}</p>
        </Box>
    )
}