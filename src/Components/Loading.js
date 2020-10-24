import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loading() {
    return (
        <div style= {{height: "100vh", width:"100%", display: "flex", alignItems : "center", justifyContent : "center"}}>
            <CircularProgress size="5rem"/>
        </div>
    )
}