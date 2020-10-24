import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import UserList from "./UserList";

const useStyles = makeStyles({});

export default function FollowModal({ title, show, dataList, handleClose }) {
  return (
    <Modal
      open={show}
      onClose={handleClose}
      style={{
        position: "absolute",
        width: "20%",
        maxHeight: "60%",
        top: "20%",
        left: "40%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxHeight: "90%",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          background: "#FFD076",
          borderRadius: "30px",
          paddingBottom: "8%",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>{dataList ? dataList.length : 0} {title}</h2>
        </div>
        <UserList dataList={dataList} title={title} handleClose = {handleClose}/>
      </div>
    </Modal>
  );
}
