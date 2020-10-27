import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import UserList from "./UserList";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  innerContainer : {
    display: "flex",
    width : "100%",
    maxHeight: "90%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    background: "#FFD076",
    borderRadius: "30px",
    paddingBottom: "8%",
  },
  modalTitle : {
    display: "flex",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
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
        justifyContent : "flex-start",
        alignItems : "center",
        width: 300,
        maxHeight: "60%",
        top: "20%",
        left: isNotSmallScreen ? "40%" : "20%",
        alignSelf : "center",
      }}
    >
      <div className={styles.innerContainer}>
        <div className = {styles.modalTitle}>
          <h2>{dataList ? dataList.length : 0} {title}</h2>
        </div>
        <UserList dataList={dataList} title={title} handleClose = {handleClose}/>
      </div>
    </Modal>
  );
}
