// ProductsList.js

import Loader from 'components/Loader/Loader';
import React from 'react';
import { Card, Table, Pagination, Form } from 'react-bootstrap';

const ProductsList = ({
    products,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    loading,
    error
}) => {
    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        onItemsPerPageChange(e);
    };

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Products List</Card.Title>
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
                                    <th>Overview</th>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Packaging</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map((product, index) => (
                                    <tr key={product._id}>
                                        <th scope="row">{product._id}</th>
                                        <td><img src={product.src} width={50} height={50} alt="Product" /></td>
                                        <td>{product.name}</td>
                                        <td>{product.qtyInStock}</td>
                                        <td>{product.packagingType && product.packagingType.name || 'N/A'}</td> 
                                        <td>{product.originalPrice} DA</td>
                                        <td>{product.finalPrice} DA</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination>
                            {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(number => (
                                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductsList;
