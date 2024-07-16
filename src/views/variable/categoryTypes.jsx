import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Table, Pagination, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { handleGetAllProducts, handleDeleteProduct } from 'apis/orders';
import ConfirmationModal from 'components/Modal/ConfirmOperation';
import { hanldeDeleteProductCategory, hanldeGetAllProductCategory } from 'apis/other';

const CategoryTypes = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPageProducts] = useState(1);
    const [itemsPerPage, setItemsPerPageProducts] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmationText, setConfirmationText] = useState('');
    const [confirmInputText, setConfirmInputText] = useState('');

    const clearState = () => {
        setProducts([]);
        setFilteredProducts([]);
        setError('');
    };

    const fetchProfileData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await hanldeGetAllProductCategory();
            if (response.data) {
                setProducts(response.data);
                setFilteredProducts(response.data);
            } else {
                setError('Failed to fetch products');
            }
        } catch (error) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        clearState();
        fetchProfileData();
    }, []);

    const handleProductsPageChange = (pageNumber) => {
        setCurrentPageProducts(pageNumber);
    };

    const handleProductsItemsPerPageChange = (e) => {
        setItemsPerPageProducts(Number(e.target.value));
        setCurrentPageProducts(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        filterProducts(e.target.value);
    };

    const filterProducts = (term) => {
        const filtered = products.filter(product =>
            product._id.includes(term) || product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPageProducts(1);
    };

    const handleDeleteProduct = async (productId) => {
        setModalMessage('Are you sure you want to delete this product?');
        setConfirmationText('CONFIRM');
        setConfirmAction(() => async () => {
            setLoading(true);
            try {
                await hanldeDeleteProductCategory(productId);
                await fetchProfileData();
            } catch (error) {
                setError('Failed to delete product');
            } finally {
                setLoading(false);
                handleCloseModal();
            }
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalMessage('');
        setConfirmAction(null);
        setConfirmInputText('');
    };

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <Loader />
    if (error) return { error }
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Products List</Card.Title>
                        <Form inline className="float-right">
                            <Form.Label className="mr-2">Items per page:</Form.Label>
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
                            <Form.Label className="mr-2">Search:</Form.Label>
                            <Col xl={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by ID or Name"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="ml-3 my-1"
                                />
                            </Col>
                        </Form>
                    </Card.Header>
                    <Card.Body>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Overview</th>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Packaging</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map((product, index) => (
                                    <tr key={product._id}>
                                        <th scope="row">{product._id}</th>
                                        <td><img src={product.src} width={50} height={50} alt="Product" /></td>
                                        <td>{product.name}</td>
                                        <td>{product.qtyInStock}</td>
                                        <td>{product.packagingType ? product.packagingType.name : 'N/A'}</td>
                                        <td>{product.originalPrice} DA</td>
                                        <td>{product.finalPrice} DA</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination>
                            {[...Array(Math.ceil(filteredProducts.length / itemsPerPage)).keys()].map(number => (
                                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handleProductsPageChange(number + 1)}>
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </Card.Body>
                </Card>
            </Col>
            <ConfirmationModal
                show={showModal}
                handleClose={handleCloseModal}
                handleConfirm={confirmAction}
                message={modalMessage}
                confirmationText="CONFIRM"
            />
        </Row>
    );
};

export default CategoryTypes;
