import React from 'react'

import { TableBody } from "@material-ui/core";
import OrderCardModal from "./OrderCardModal";
import OrderRow from './OrderRow';

export default function OrderList(orders, searchString) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState();
  const [modalDataId, setModalDataId] = React.useState();

  function handleClose() {
    setShowModal(false);
  }

  function handleOpenModal(data, id) {
    setModalData(data);
    setModalDataId(id);
    setShowModal(true);
  }
  return (
    <div>
      <TableBody>
        {orders
          ? orders.map((order) => (
              <OrderRow
                key={order[0]}
                order={order}
                handleOpenModal={handleOpenModal}
                filter={searchString}
              />
            ))
          : null}
      </TableBody>
      <OrderCardModal
        show={showModal}
        handleClose={handleClose}
        data={modalData}
        dataId={modalDataId}
      />
    </div>
  );
}
