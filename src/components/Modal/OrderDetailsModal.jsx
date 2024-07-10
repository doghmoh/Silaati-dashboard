import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import OrderDetails from './OrderDetails';

function OrderDetailsModal({ visible, order, closeModal }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={visible} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderDetails order={order} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>closeModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrderDetailsModal;
