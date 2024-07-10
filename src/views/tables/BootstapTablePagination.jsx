import React, { useState } from 'react';
import { Table, Pagination, Form } from "react-bootstrap";

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const PaginatedTable = ({ data, columns, itemsPerPageOptions = [5, 10, 15, 20] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page whenever items per page changes
    };

    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <Form inline className="float-right">
                <Form.Label className="mr-2">Items per page:</Form.Label>
                <Form.Control
                    as="select"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="mr-sm-2"
                >
                    {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Form.Control>
            </Form>
            <Table striped responsive>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {column.render 
                                        ? column.render(getNestedValue(item, column.accessor), item) 
                                        : getNestedValue(item, column.accessor)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(number => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => handlePageChange(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default PaginatedTable;
