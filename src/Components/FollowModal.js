import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import UserList from "./UserList";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  innerContainer : {
    maxWidth : 600,
    minWidth : 300,
    width : "40%",
    background : "white",
  },
  modalTitle : {
    display: "flex",
    height: "20%",
    width : "100%",
    justifyContent: "center",
    alignItems: "center",
    background: "#7AA18A",
  },



});

export default function FollowModal({ title, show, dataList, handleClose }) {

  const styles = useStyles();

  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Modal
      open={show}
      onClose={handleClose}
      style = {{
        display: "flex",
        position: "absolute",
        justifyContent : "center",
        alignItems : "center",
        width : "100%",
        maxHeight: "60%",
        top: "20%",
        alignSelf : "center",
      }}
    >
      <div className={styles.innerContainer}>
        <div className = {styles.modalTitle}>
          <Button disabled = {true}/>
          <h2 style = {{textAlign : "center", width : "90%"}}>{dataList ? dataList.length : 0} {title}</h2>
          <Button style ={{backgroundColor : 'transparent'}} onClick = {handleClose}>X</Button>
        </div>
        <div style = {{display : "flex", width : "100%", justifyContent : "center", alignItems : "center", marginTop : 20, marginBottom : 20, maxHeight : 500, overflow : "scroll",}}>
          <UserList dataList={dataList} title={title} handleClose = {handleClose}/>
        </div>
      </div>
    </Modal>
  );
}
