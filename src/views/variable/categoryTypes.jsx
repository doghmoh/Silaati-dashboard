import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Table, Pagination, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { handleGetAllProducts, handleDeleteProduct } from 'apis/orders';
import ConfirmationModal from 'components/Modal/ConfirmOperation';
import { hanldeAddProductCategory, hanldeDeleteProductCategory, hanldeGetAllProductCategory } from 'apis/other';

const CategoryTypes = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [input, setInput] = useState('');
    const [image64, setImage64] = useState('');
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
    const [selectedProducts, setSelectedProducts] = useState([]);

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

    const handleCreateAgent = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await hanldeAddProductCategory(input, image64);
            if (response.data) {
                fetchProfileData();
            } else {
                setError('Failed to fetch products');
            }
        } catch (error) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(filteredProducts.map(product => product._id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (e, productId) => {
        if (e.target.checked) {
            setSelectedProducts([...selectedProducts, productId]);
        } else {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        }
    };

    const handleBulkDelete = async () => {
        setModalMessage('Are you sure you want to delete the selected products?');
        setConfirmationText('CONFIRM');
        setConfirmAction(() => async () => {
            setLoading(true);
            try {
                await Promise.all(selectedProducts.map(productId => hanldeDeleteProductCategory(productId)));
                await fetchProfileData();
                setSelectedProducts([]);
            } catch (error) {
                setError('Failed to delete products');
            } finally {
                setLoading(false);
                handleCloseModal();
            }
        });
        setShowModal(true);
    };

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <Row>
            <Col md={6}>
                <Card className="mb-3">
                    <Card.Header>
                        <Card.Title as="h5">Add Category Type</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formCategoryType">
                                <Form.Label>Category Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category type"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formImage" className='mt-2' >
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                            <Button variant="primary" className='mt-2' onClick={handleCreateAgent}>
                                Save Changes
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6}>
                <Card className="mb-3">
                    <Card.Header>
                        <Card.Title as="h5">Filter Products</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form inline className="mb-3">
                            <Form.Label className="mr-2">Items per page:</Form.Label>
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
                            <Form.Label className="mr-2">Search:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by ID or Name"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="ml-3 my-1"
                            />
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Products List</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Button variant="danger" onClick={handleBulkDelete} disabled={selectedProducts.length === 0}>
                            <i class="fa fa-trash "></i> Delete selected
                        </Button>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={selectedProducts.length === filteredProducts.length}
                                        />
                                    </th>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                checked={selectedProducts.includes(product._id)}
                                                onChange={(e) => handleSelectProduct(e, product._id)}
                                            />
                                        </td>
                                        <th scope="row">{product._id}</th>
                                        <td><img src={product.src} width={50} height={50} /></td>
                                        <td>{product.name}</td>
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
