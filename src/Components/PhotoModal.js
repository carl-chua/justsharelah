import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    height : "100%"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    overflow: "scroll",
  },
}));

export default function PhotoModal({show, handleClose, url}){
  const styles = useStyles();

  return (
    <Modal
      open={show}
      onClose={handleClose}
      style={{
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "scroll",
        alignSelf: "center",
      }}
    >
        <img src = {url} style = {{height : "90%"}}/>
    </Modal>
  )
}
