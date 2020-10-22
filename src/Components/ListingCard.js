import {Card, Box, CardContent, CardMedia, CardActionArea } from "@material-ui/core";

import React from "react";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height : 450,
        minWidth : 250,
        width : `${80/3}%`,
        textAlign : "start",
        marginLeft : "2.5%",
        marginRight : "2.5%",
        marginBottom : "5%",
        borderBottom : "3",
    },
    mainText : {
        fontSize: 25,
        margin:0,
        fontWeight : "bold",
    },
    subText : {
        fontSize: 20,
        color:"gray", 
        paddingTop : 5,
        paddingBottom : 5,
        margin:0
    },
    desText : {
        fontSize: 16,
        color:"gray", 
        margin:0,
    },
})

export default function ListingCard({data}) {

    const styles = useStyles()

    return (
        <Card className = {styles.root}>
            <CardActionArea onClick = {() => console.log("clicked listingcard")}>
                <CardMedia
                    component = "img"
                    src = "https://images.unsplash.com/photo-1596650956793-68f12df4e549?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2980&q=80"
                    style = {{
                        height : 250
                    }}
                />
                <CardContent>
                    <Box
                        display = "flex"
                        flexDirection = "column"
                        style = {{
                            display : "flex",
                            flexDirection : "column",
                            justifyContent : "space-between",
                            height : 170,
                        }}
                    >
                        <div
                            style = {{
                                display : "flex",
                                flexDirection : "column",
                                justifyContent : "space-between",
                            }}
                        >
                            <text className = {styles.mainText}>{data.title.substr(0,20)}</text>
                            <text className = {styles.subText}>Min target : S${data.targetAmount}</text>
                            <text className = {styles.desText}>
                                {data.description.length < 70 ? data.description : data.description.substr(0,70) + "..."}
                            </text>
                        </div>
                        <div 
                            className = {styles.desText} 
                            style = {{
                                color : "black",
                            }}
                        >
                            {data.members} Kuppers
                        </div>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}