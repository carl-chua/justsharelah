import { Button, Divider, IconButton, RootRef } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useDropzone } from "react-dropzone";
import { uploadReceipt } from "../API/Storage";

import { Image } from "react-fullscreen-image";
import PhotoModal from "./PhotoModal";

const useStyles = makeStyles((theme) => ({
  container: {
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    border: "dashed",
    paddingTop: "2%",
    paddingBottom: "4%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#8FBCAC",
    width: "100%",
    //overflow: "scroll",
    //maxHeight: 300,
  },
  dropzone: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "black",
    fontWeight: "500",
  },
  button: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#CC7F5D",
    color: "white",
  },
}));

export default function Dropzone({
  handlePhotoModal,
  url,
  setUrl,
  setAllUploads,
  setIsUploading,
  disabled,
}) {
  const styles = useStyles();

  //const [uploadFile, setUploadFile] = React.useState();
  //const [allUploads, setAllUploads] = React.useState([])

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/*",
    onDropAccepted: async function (files, event) {
      console.log("DROP ACCEPTED: ", JSON.stringify(files), event.target.value);
      setIsUploading(true);
      let file = await uploadReceipt(files[0]);
      console.log("RECEIVED URL: " + file[0]);
      setAllUploads((prevData) => {
        return setAllUploads([...prevData, file]);
      });
      setUrl(file[1]);
      setIsUploading(false);
    },
    maxFiles: 1,
    disabled : disabled,
  });

  const { ref, ...rotProps } = getRootProps();

  const handleOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("CLICKED");
    handlePhotoModal(url);
    //setIsPhotoModal(true);
  };

  return (
    <section className={styles.container}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>{!disabled ? "Upload Proof of Payment" : "Payment Receipt"}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "100%",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          {url && (
            <IconButton
              disableRipple={true}
              onClick={handleOpen}
              style={{ backgroundColor: "transparent" }}
            >
              <img src={url} style={{ maxHeight: 100, maxWidth: "100%" }} />
            </IconButton>
          )}
        </div>
        
        {!disabled && <Button className={styles.button}>UPLOAD FILE</Button>}
      </div>
    </section>
  );
}
