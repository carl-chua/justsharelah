import { Avatar, Card, Box, CardContent, CardActions, Button, Modal } from "@material-ui/core";

import Rating from '@material-ui/lab/Rating';
import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../API/Users";
import UserList from "./UserList";


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

export default function UserCard({user, userId, openFollowingModal, openFollowersModal}) {

    const styles = useStyles()

    const currentUser = useSelector(state => state.currentUser)

    const userToken = useSelector(state => state.userToken);

    async function handleFollow() {
        console.log("clicked")
       var result = await followUser(userToken, userId);
       console.log("FOLLOWED? : " + result)
    }

    async function handleUnfollow() {
        console.log("unfollowing");
        var result = await unfollowUser(userToken, userId);

    }

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
                {user.username != currentUser.username ?
                 (!user.followers.includes(userToken) ?
                <Button 
                    size="small"
                    className = {styles.buttonPrimary}
                    onClick = {handleFollow}
                >
                    <span style = {{color:"white"}}>Follow</span>
                </Button>
                :
                <Button 
                    size="small"
                    className = {styles.buttonPrimary}
                    onClick = {handleUnfollow}
                >
                    <span style = {{color:"white"}}>Unfollow</span>
                </Button>
                )
                :
                null
                }
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
                            <p className = {styles.subText}>{user.followers ? user.followers.length : 0}</p>
                        </Box>
                    </Button>
                    <Button onClick={openFollowingModal}>
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

/*
                <Modal
                open={showFollowingModal}
                onClose={isFollowingModal(false)}
            >
                <UserList dataList = {null} title = {"Following"}/>
            </Modal>
            */