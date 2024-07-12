// OrdersList.js

import React, { useState } from 'react';
import { Card, Table, Pagination, Form, Button } from 'react-bootstrap';
import Loader from 'components/Loader/Loader'; // Assuming Loader is a spinner component
import OrderDetailsModal from 'components/Modal/OrderDetailsModal';

const OrdersList = ({
    orders,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    loading,
    error
}) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };
    const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        onItemsPerPageChange(e);
    };

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Orders List</Card.Title>
                <Form inline className="float-right">
                    <Form.Label className="mr-2">Items per page:</Form.Label>
                    <Form.Control
                        as="select"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="mr-sm-2"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </Form.Control>
                </Form>
            </Card.Header>
            <Card.Body>
                {loading ? (
                    <Loader /> // Assuming Loader is a spinner component
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Retailer</th>
                                    <th>Supplier</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedOrders.map((order, index) => (
                                    <tr key={order._id}>
                                         <th scope="row">{order._id}</th>
                                            <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
                                            <td>
                                                <h6 className="mb-1 fw-bold">{order.retailerInfos.firstName.toUpperCase() + ' ' + order.retailerInfos.lastName.toUpperCase()}</h6>
                                                <p className="m-0">{order.retailerInfos.businessName.toUpperCase()}</p>
                                            </td>
                                            <td>
                                                <h6 className="mb-1 fw-bold">{order.supplierInfos.firstName.toUpperCase() + ' ' + order.supplierInfos.lastName.toUpperCase()}</h6>
                                                <p className="m-0">{order.supplierInfos.businessName.toUpperCase()}</p>
                                            </td>
                                            <td>{order.payment.finalTotal} DA</td>
                                            <td><span className={`status ${order.status.toLowerCase()} label text-white f-12`}>{order.status}</span></td>
                                            <td>
                                            <Button variant="primary" onClick={() => handleOpenModal(item)}>
                                                    View Details
                                                </Button>
                                            </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination>
                            {[...Array(Math.ceil(orders.length / itemsPerPage)).keys()].map(number => (
                                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </>
                )}
            </Card.Body>

            <OrderDetailsModal visible={showModal} order={orders} closeModal={setShowModal} />
        </Card>
    );
};

export default OrdersList;
