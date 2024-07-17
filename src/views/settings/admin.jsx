import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Table, Pagination, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { handleUpdateAgentPassword, handleCreateNewAgent, handleCreateAgents, handelGetAdmin } from 'apis/users';
import Loader from 'components/Loader/Loader';
import ConfirmationModal from 'components/Modal/ConfirmOperation';

const Admin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agents, setAgents] = useState([]);
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);
    const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
    const [newAgent, setNewAgent] = useState({ firstName: '', lastName: '', phoneNumber: '', role: 'agent', password: '' });

    const [otp, setOtp] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);

    const clearState = () => {
        setAgents([]);
        setError('');
    };

    const fetchAgentData = async () => {
        setLoading(true);
        setError('');
        try {
            const agentResponse = await handelGetAdmin();
            if (agentResponse.data) {
                console.log(agentResponse.data);
                setAgents(agentResponse.data);
                setFilteredAgents(agentResponse.data.filter((agent) => agent.role === 'agent'));
            } else {
                setError('Failed to fetch agents');
            }
        } catch (error) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        clearState();
        fetchAgentData();
    }, []);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterAgents(term);
    };

    const filterAgents = (term) => {
        const filtered = agents.filter(agent =>
            agent.firstName.toLowerCase().includes(term.toLowerCase()) ||
            agent.lastName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredAgents(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleDeleteAgent = async (id) => {
        console.log(id);
        setModalMessage('Are you sure you want to delete this agent?');
        setConfirmAction(() => async () => {
            setLoading(true);
            try {
                // Call your API to delete agent
                // await deleteAgent(id);
                // Example: Assuming deleteAgent is an async function that deletes an agent
                // await deleteAgent(id);
                fetchAgentData(); // Refresh agent list
            } catch (error) {
                setError('Failed to delete agent');
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
                fetchAgentData();
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

    const handleShowPassword = async (id) => {
        setShowOtpModal(true);
    };

    const handleOtpRequest = async () => {
        setLoading(true);
        try {
            const response = await handleUpdateAgentPassword(otp);
            if (response.data) {
                // Handle success, e.g., display success message
                console.log('Password updated successfully');
            } else {
                setError('Failed to update password');
            }
        } catch (error) {
            setError('Failed to update password');
        } finally {
            setLoading(false);
            setShowOtpModal(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await handleCreateNewAgent(phoneNumberInput, otp);
            if (response.data) {
                // Handle success, e.g., create new agent
                console.log('Agent created successfully');
                fetchAgentData(); // Refresh agent list
            } else {
                setError('Failed to create agent');
            }
        } catch (error) {
            setError('Failed to create agent');
        } finally {
            setLoading(false);
            setShowOtpModal(false);
        }
    };

    const paginatedAgents = filteredAgents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    if (loading) return <Loader />;
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Agents List</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form inline className="float-right mr-3">
                            <Row>
                                <Col xl={3}>
                                <Form.Label className="mr-2">Item per page:</Form.Label>
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
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Agents List</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Button variant="primary" onClick={() => setShowCreateAgentModal(true)} className="float-right">
                            New Agent
                        </Button>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone number</th>
                                    <th>Role</th>
                                    <th>CreateAt</th>
                                    <th>State</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedAgents.map((agent, index) => (
                                    <tr key={agent._id}>
                                        <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                        <td>{agent.firstName + ' ' + agent.lastName}</td>
                                        <td>{agent.phoneNumber}</td>
                                        <td><span className='bg-info rounded p-1 text-white'>{agent.role.toUpperCase()}</span></td>
                                        <td>{new Date(agent.createdAt).toLocaleString()}</td>
                                        <td><span className='bg-success rounded p-1 text-white'>{agent.accountState.toUpperCase()}</span></td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDeleteAgent(agent._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination>
                            {[...Array(Math.ceil(filteredAgents.length / itemsPerPage)).keys()].map(number => (
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
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
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
