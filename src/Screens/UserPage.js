import { Grid, Box, Button, Modal} from "@material-ui/core";
import React from "react";

import UserCard from "../Components/UserCard";
import { makeStyles } from '@material-ui/core/styles';


import ListingList from "../Components/ListingList";
import { getUserByUsername, getUserByUsernameListener } from "../API/Users";
import { useParams } from "react-router";
import ReviewList from "../Components/ReviewList";
import UserList from "../Components/UserList";


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
    tabHeaderText : {
        textAlign : "start",
        fontSize : 36,
        fontWeight : "bold",
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

const dummyReview = [
    {
        id : 1,
        numStar : 5,
        message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
        reviewer : "test123",
        reviewee : "Max",
        date : new Date()
    },
    {
        id : 2,
        numStar : 4,
        message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
        reviewer : "test123",
        reviewee : "Max",
        date : new Date()
    },
    {
        id : 3,
        numStar : 3,
        message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
        reviewer : "test123",
        reviewee : "Max",
        date : new Date()
    },
    {
        id : 4,
        numStar : 2,
        message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
        reviewer : "test123",
        reviewee : "Max",
        date : new Date()
    },
    {
        id : 5,
        numStar : 1,
        message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
        reviewer : "test123",
        reviewee : "Max",
        date : new Date()
    },
]

export default function UserPage() {

    const styles = useStyles()
    
    const[view, setView] = React.useState(1)

    const[user, setUser] = React.useState();

    let { username } = useParams();

    const[showFollowingModal, setShowFollowingModal] = React.useState(false);
    const[showFollowersModal, setShowFollowersModal] = React.useState(false);

    function openFollowingModal() {
        setShowFollowingModal(true);
    }

    function closeFollowingModal() {
        setShowFollowingModal(false);
    }

    function openFollowersModal() {
        setShowFollowersModal(true);
    }

    function closeFollowersModal() {
        setShowFollowersModal(false);
    }

    React.useEffect(() => {
        const unsubscribe = getUserByUsernameListener(username, setUser) 
        
        return unsubscribe
    },[])

    React.useEffect(() => {
        console.log(JSON.stringify(user))
    },[user])

    return(
        user ?
        <Box className = {styles.root}>
            <Grid
                container
                direction-xs-column = "true"
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
                        <UserCard 
                            user={user[1]} 
                            userId={user[0]} 
                            openFollowersModal = {openFollowersModal}
                            openFollowingModal = {openFollowingModal}
                        />

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
                                style = {view === 1 ? {textDecorationLine:"underline"} : {}}
                            >
                                Listings
                            </span>
                        </Button>
                        <Button size="small" onClick = {() => setView(2)}>
                            <span
                                className = {styles.lowerCase}
                                style = {view === 2 ? {textDecorationLine:"underline"} : {}}
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
                        <p className = {styles.tabHeaderText}>
                            {view === 1 && "Listings"}
                            {view === 2 && "Reviews"}
                        </p>
                        
                        {view === 1 && <ListingList dataList = {dummyData} colSize = {3}/>}
                        {view === 2 && <ReviewList dataList = {dummyReview}/>}

                    </Box>
                </Grid>
            </Grid>

            <Modal
                open={showFollowingModal}
                onClose={closeFollowingModal}
            >
                <UserList dataList = {user[1].following} title = {"Following"}/>
            </Modal>
        </Box>
        :
        <div className = {styles.root} style = {{justifyContent : "center", alignItems: "center", height: "80vh"}}>
            <p>User {username} does not exist!</p>
        </div>
    )
}