import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles({

})

export default function FollowModal({title, show, dataList, handleClose}) {
    return (
        <Modal
            open = {show}
            onClose = {handleClose}
        >
            <UserList dataList = {dataList} title = {title}/>
        </Modal>
    )
}