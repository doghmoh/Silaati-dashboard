import { hanldeGetAllOrders } from 'apis/orders';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Form, Button, Pagination } from 'react-bootstrap';
import './orders.css';
import OrderDetailsModal from 'components/Modal/OrderDetailsModal';
import Loader from 'components/Loader/Loader';

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orders, setOrders] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPageProducts] = useState(1);
    const [itemsPerPage, setItemsPerPageProducts] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleProductsPageChange = (pageNumber) => {
        setCurrentPageProducts(pageNumber);
    };

    const handleProductsItemsPerPageChange = (e) => {
        setItemsPerPageProducts(Number(e.target.value));
        setCurrentPageProducts(1);
    };

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const fetchOrders = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await hanldeGetAllOrders();
            if (response) {
                const { data } = response;
                setError('');
                setOrders(data);
            } else {
                setError('Data not loaded correctly');
            }
        } catch (error) {
            setError('Data not loaded correctly');
        } finally {
            setLoading(false);
        }
    };

    const handleViewOrder = () => {
        // Handle view order logic here
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearchTerm = searchTerm === '' || order.retailerInfos.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || order.retailerInfos.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || order.supplierInfos.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || order.supplierInfos.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilterStatus = filterStatus === 'All' || order.status === filterStatus;
        return matchesSearchTerm && matchesFilterStatus;
    });

    const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <Loader />;

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Orders List</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form inline className="mb-3 row">
                                <Col xl={3}>
                                    <Form.Control type="text" placeholder="Search..." className="mr-sm-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </Col>
                                <Col xl={3}>
                                    <Form.Control as="select" className="mr-sm-2" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                        <option value="All">All</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </Form.Control>
                                </Col>
                                <Col xl={4}>
                                    <Form.Control
                                        as="select"
                                        value={itemsPerPage}
                                        onChange={handleProductsItemsPerPageChange}
                                        className="mr-sm-2 my-1"
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </Form.Control>
                                </Col>
                                <Col xl={3}>
                                    <Button variant="primary" onClick={fetchOrders}>Refresh</Button>
                                </Col>
                            </Form>
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Retailer</th>
                                        <th>Supplier</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedOrders.map((item) => (
                                        <tr key={item._id}>
                                            <th scope="row">{item._id}</th>
                                            <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                                            <td>
                                                <h6 className="mb-1 fw-bold">{item.retailerInfos.firstName.toUpperCase() + ' ' + item.retailerInfos.lastName.toUpperCase()}</h6>
                                                <p className="m-0">{item.retailerInfos.businessName.toUpperCase()}</p>
                                            </td>
                                            <td>
                                                <h6 className="mb-1 fw-bold">{item.supplierInfos.firstName.toUpperCase() + ' ' + item.supplierInfos.lastName.toUpperCase()}</h6>
                                                <p className="m-0">{item.supplierInfos.businessName.toUpperCase()}</p>
                                            </td>
                                            <td>{item.payment.finalTotal} DA</td>
                                            <td><span className={`status ${item.status.toLowerCase()} label text-white f-12`}>{item.status}</span></td>
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
                                {[...Array(Math.ceil(filteredOrders.length / itemsPerPage)).keys()].map(number => (
                                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handleProductsPageChange(number + 1)}>
                                        {number + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <OrderDetailsModal visible={showModal} order={selectedOrder} closeModal={handleCloseModal} />
        </React.Fragment>
    );
};

export default Orders;