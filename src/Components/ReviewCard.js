import { Avatar, Card, Box, CardContent, CardMedia, CardActionArea } from "@material-ui/core";

import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { getUserById, getUserByUsername } from "../API/Users";

import Rating from '@material-ui/lab/Rating';

import moment from 'moment';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth : 250,
        width : `100%`,
        textAlign : "start",
        marginLeft : "2.5%",
        marginRight : "2.5%",
        marginBottom : "1%",
        borderBottom : "5",
    },
    mainText : {
        fontSize: 25,
        margin:0,
        fontWeight : "bold",
    },
    nameText : {
        fontSize: 20,
        color:"gray", 
        margin:0,
    },
    desText : {
        fontSize: 16,
        color:"gray", 
        margin:0,
    },
})

export default function ReviewCard({data}) {


    const styles = useStyles()
    const[reviewer,setReviewer] = React.useState()

    let history = useHistory();
    
    React.useEffect(() => {
        getUserById(data.reviewer,setReviewer);
    },[])

    React.useEffect(() => {
        if(reviewer) {
            //console.log("REVIEWER IS: " + JSON.stringify(reviewer))
            setReviewer(reviewer);
        }
    },[reviewer])

    function handleOnClick() {
        history.push(`/user/${reviewer.username}`)
    }

    React.useEffect(() => {
        console.log(data.message)
    },[data])
    return (
        reviewer ? 
        <Card className = {styles.root}>
            <CardActionArea onClick={handleOnClick}>
                <CardContent >
                    <Box
                        display = "flex"
                        flexDirection = "column"
                        style = {{
                            display : "flex",
                            flexDirection : "column",
                            justifyContent : "space-between",
                            paddingTop : "1.5%",
                        }}
                    >
                        
                        <Box
                            display = "flex"
                            flexDirection = "row"
                            alignItems = "center"
                            
                        >
                            <Avatar 
                            src = {reviewer.imageUrl} 
                            style = {{
                                width:45,
                                height:45,
                                }}
                            >
                                <span style = {{fontSize:"100%"}}>{reviewer.username.charAt(0).toUpperCase()}</span>
                            </Avatar>
                            <Box
                                display = "flex"
                                flexDirection = "row"
                                alignItems = "center"
                                justifyContent = "space-between"
                                style = {{
                                    width : "100%",
                                }}
                            >
                                <Box
                                    display = "flex"
                                    flexDirection = "column"
                                    style = {{
                                        marginTop : 15,
                                        marginLeft : 10,
                                    }}
                                >
                                <p className = {styles.nameText}>{reviewer.username}</p>
                                <Rating 
                                    value = {data.numStars}
                                    readOnly = {true}
                                    precision = {0.5}
                                    size = "small"
                                />
                                </Box>
                                
                                <p className = {styles.desText}>{moment(data.date.toDate()).format("DD MMM YYYY")}</p>
                            </Box>
                        
                        </Box>
                        <Box
                            display = "flex"
                            flexDirection = "column"
                            style = {{
                                marginTop : "1.5%",
                                marginLeft : 55,
                            }}
                        >
                            
                            <p className = {styles.desText}>{data.message}</p>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
        : null
    )
}