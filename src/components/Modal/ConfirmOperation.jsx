// components/ConfirmationModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ConfirmationModal = ({ show, handleClose, handleConfirm, message, confirmationText }) => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const isConfirmEnabled = inputText === confirmationText;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                <Form.Group>
                    <Form.Label>Please type "{confirmationText}" to confirm:</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm} disabled={!isConfirmEnabled}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
