import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Table, Pagination, Button } from 'react-bootstrap';
import Loader from 'components/Loader/Loader';
import ConfirmationModal from 'components/Modal/ConfirmOperation';

const GenericTable = ({ title, fetchData, createItem, deleteItem, itemFields, itemKey }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [itemInput, setItemInput] = useState(''); // Initialize as an empty string if handling single field
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmInputText, setConfirmInputText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const clearState = () => {
    setItems([]);
    setFilteredItems([]);
    setError('');
  };

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchData();
      if (response.data) {
        setItems(response.data);
        setFilteredItems(response.data);
      } else {
        setError('Failed to fetch items');
      }
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearState();
    fetchItems();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterItems(e.target.value);
  };

  const filterItems = (term) => {
    const filtered = items.filter(
      (item) => item[itemKey].toString().includes(term) || item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleDeleteItem = async (itemId) => {
    setModalMessage('Are you sure you want to delete this item?');
    setConfirmAction(() => async () => {
      setLoading(true);
      try {
        await deleteItem(itemId);
        await fetchItems();
      } catch (error) {
        setError('Failed to delete item');
      } finally {
        setLoading(false);
        handleCloseModal();
      }
    });
    setShowModal(true);
  };

  const handleDeleteSelectedItems = async () => {
    setModalMessage('Are you sure you want to delete selected items?');
    setConfirmAction(() => async () => {
      setLoading(true);
      try {
        for (const itemId of selectedItems) {
          await deleteItem(itemId);
        }
        await fetchItems();
        setSelectedItems([]);
      } catch (error) {
        setError('Failed to delete selected items');
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

  const handleCreateItem = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await createItem(itemInput);
      if (response.data) {
        fetchItems();
      } else {
        setError('Failed to add item');
      }
    } catch (error) {
      setError('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const handleItemInputChange = (e) => {
    setItemInput(e.target.value); // Assuming itemInput is a single field
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <Row>
      <Col>
        <Row>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Add New Item</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Form>
                    <Form.Group controlId="formItemInput">
                      <Form.Label>New Item</Form.Label>
                      <Form.Control type="text" placeholder="Enter item name" value={itemInput} onChange={handleItemInputChange} />
                      <Button className="mt-3" onClick={handleCreateItem}>
                        Add Item
                      </Button>
                    </Form.Group>
                  </Form>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Filter Table</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form inline className="float-right">
                  <Form.Label className="mr-2">Items per page:</Form.Label>
                  <Form.Control as="select" value={itemsPerPage} onChange={handleItemsPerPageChange} className="mr-sm-2 my-1">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </Form.Control>
                  <Form.Label className="mr-2 mt-3">Search:</Form.Label>
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
        </Row>
        <Card>
          <Card.Body>
            <Button variant="danger" onClick={handleDeleteSelectedItems} disabled={selectedItems.length === 0}>
              <i className="fa fa-trash"></i> Delete selected
            </Button>
            <Table striped responsive>
              <thead>
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      onChange={(e) => setSelectedItems(e.target.checked ? filteredItems.map((item) => item[itemKey]) : [])}
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    />
                  </th>
                  {itemFields.map((field, index) => (
                    <th key={index}>{field.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item, index) => (
                  <tr key={item[itemKey]}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedItems.includes(item[itemKey])}
                        onChange={() => handleSelectItem(item[itemKey])}
                      />
                    </td>
                    {itemFields.map((field, idx) => (
                      <td key={idx}>{item[field.key]}</td>
                    ))}
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteItem(item[itemKey])}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="danger" onClick={handleDeleteSelectedItems} disabled={selectedItems.length === 0}>
              <i className="fa fa-trash"></i> Delete selected
            </Button>
            <Pagination>
              {[...Array(Math.ceil(filteredItems.length / itemsPerPage)).keys()].map((number) => (
                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
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

export default GenericTable;
