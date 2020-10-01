import { Avatar, Card, Box, CardContent, CardActions, Button } from "@material-ui/core";

import Rating from '@material-ui/lab/Rating';
import React from "react";

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        background : 'linear-gradient(to bottom, #FFD076 30%, white 20%, white)',
            //minWidth : 220,
            paddingLeft : "5%",
            paddingRight : "5%",
            maxHeight : "auto",
            borderRadius : "8%",
            border : "1px solid #BEBEBE",
            boxShadow : "-10px 10px 4px rgba(0, 0, 0, 0.05)"
    },
    cardContent : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "space",
        alignItems : "center",
        paddingTop : "25%",
    },
    nameText : {
        fontWeight : "bold", 
        fontSize:40, 
        margin:0,
    },
    subText : {
        fontSize:"100%",
        color:"gray", 
        margin:0
    },
    buttonPrimary : {
        backgroundColor : '#CC7F5D',
        padding : 5,
        paddingLeft : 15,
        paddingRight : 15,
    },
    ratingBox : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
    }
})  

export default function UserCard({user}) {

    const styles = useStyles()

    return (
        user ? 
        <Card 
            className = {styles.root}
        >
            <CardContent
                className = {styles.cardContent}
            >
                <Avatar 
                    src = {user.imageUrl} 
                    style = {{
                        width:100,
                        height:100,
                        }}
                    >
                        <span style = {{fontSize:"300%"}}>{user.username.charAt(0).toUpperCase()}</span>
                </Avatar>
                <div>
                    <p className = {styles.nameText}>{user.username}</p>
                    <p className = {styles.subText}>{user.city}</p>
                </div>
                <Box
                    style = {{
                        display : "flex",
                        flexDirection : "row",
                        alignItems : "center",
                        justifyContent : "center",
                        width : "100%",
                    }}
                >
                    
                    <p>
                        ({user.rating ? user.rating.toFixed(1) : "0.0"})
                    </p>
                        <Rating 
                            value = {user.rating}
                            readOnly = {true}
                            precision = {0.5}
                        />
                    <p className = {styles.subText}>
                            {user.ratingCount ? user.ratingCount : "0"}
                    </p>
                </Box>
                <Button 
                    size="small"
                    className = {styles.buttonPrimary}
                    onClick = {() => console.log("clicked")}
                >
                    <span style = {{color:"white"}}>Follow</span>
                </Button>
                <Box
                    display="flex"
                    flexDirection = "row"
                    justifyContent = "space-between"
                    alignItems = "center"
                    style = {{
                        width : "100%",
                        paddingTop : "8%",
                        paddingBottom : "10%",
                    }}
                >
                    <Button>
                        <Box
                            className = {styles.ratingBox}
                        >
                            <p className = {styles.subText}>Followers</p>
                            <p className = {styles.subText}>{user.follwers ? user.follwers.length : 0}</p>
                        </Box>
                    </Button>
                    <Button>
                        <Box
                            className = {styles.ratingBox}
                        >
                            <p className = {styles.subText}>Following</p>
                            <p className = {styles.subText}>{user.following ? user.following.length : 0}</p>
                        </Box>
                    </Button>
                </Box>
            </CardContent>
        </Card>
        :
        null
    )

}