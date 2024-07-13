import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Table, Pagination, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { hanldeGetAdmin, handleCreateAgents, handleDeleteUser } from 'apis/users';
import Loader from 'components/Loader/Loader';
import ConfirmationModal from 'components/Modal/ConfirmOperation';

const Admin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [admins, setAdmins] = useState([]);
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);
    const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
    const [newAgent, setNewAgent] = useState({ firstName: '', lastName: '', phoneNumber: '', role: 'agent', password: '' });

    const clearState = () => {
        setAdmins([]);
        setError('');
    };

    const fetchProfileData = async () => {
        setLoading(true);
        setError('');
        try {
            const adminResponse = await hanldeGetAdmin();
            if (adminResponse.data) {
                console.log(adminResponse.data);
                setAdmins(adminResponse.data);
                setFilteredAdmins(adminResponse.data.filter((item) => item.role === 'agent'));
            } else {
                setError('Failed to fetch admins');
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

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterAdmins(term);
    };

    const filterAdmins = (term) => {
        const filtered = admins.filter(admin =>
            admin.firstName.toLowerCase().includes(term.toLowerCase()) ||
            admin.lastName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredAdmins(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleDeleteAdmin = async (id) => {
        console.log(id)
        setModalMessage('Are you sure you want to delete this admin?');
        setConfirmAction(() => async () => {
            setLoading(true);
            try {
                await handleDeleteUser(id)
                fetchProfileData()
            } catch (error) {
                setError('Failed to delete admin');
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
    };

    const handleCreateAgent = async () => {
        setLoading(true);
        try {
            const response = await handleCreateAgents(newAgent);
            if (response.data) {
                fetchProfileData(); // Refresh the admin list
                setShowCreateAgentModal(false);
            } else {
                setError('Failed to create agent');
            }
        } catch (error) {
            setError('Failed to create agent');
        } finally {
            setLoading(false);
        }
    };

    const paginatedAdmins = filteredAdmins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    if (loading) return <Loader />;
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Admins List</Card.Title>
                        <Button variant="primary" onClick={() => setShowCreateAgentModal(true)} className="float-right">
                            New Agent
                        </Button>
                        <Form inline className="float-right mr-3">
                            <Row>
                                <Col xl={3}>
                                    <Form.Control
                                        as="select"
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                        className="mr-sm-2 my-1"
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </Form.Control>
                                </Col>
                                <Col xl={3}>
                                    <Form.Label className="mr-2">Search:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search by Name"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="ml-3 my-1"
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Card.Header>
                    <Card.Body>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>CreateAt</th>
                                    <th>State</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedAdmins.map((admin, index) => (
                                    <tr key={admin._id}>
                                        <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                        <td>{admin.firstName + ' ' + admin.lastName}</td>
                                        <td>{admin.role}</td>
                                        <td>{new Date(admin.createdAt).toLocaleString()}</td>
                                        <td>{admin.accountState}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDeleteAdmin(admin._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination>
                            {[...Array(Math.ceil(filteredAdmins.length / itemsPerPage)).keys()].map(number => (
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
            <Modal show={showCreateAgentModal} onHide={() => setShowCreateAgentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Agent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={newAgent.firstName}
                                onChange={(e) => setNewAgent({ ...newAgent, firstName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={newAgent.lastName}
                                onChange={(e) => setNewAgent({ ...newAgent, lastName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={newAgent.phoneNumber}
                                onChange={(e) => setNewAgent({ ...newAgent, phoneNumber: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={newAgent.password}
                                onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateAgentModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateAgent}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
};

export default Admin;
