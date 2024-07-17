import { handelGetAllUsers } from 'apis/users';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import avatar2 from '../../assets/images/user/avatar-2.jpg';

const Suppliers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchPhoneQuery, setSearchPhoneQuery] = useState('');
    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await handelGetAllUsers();
            if (response) {
                setError('');
                setUsers(response.data.filter(item => item.role === 'supplier'));
            } else {
                setError('Data not loaded correctly');
            }
        } catch (error) {
            setError('Data not loaded correctly');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedUsers(users.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleDeleteSelected = () => {
        const updatedUsers = users.filter(user => !selectedUsers.includes(user.id));
        setUsers(updatedUsers);
        setSelectedUsers([]);
        setSelectAll(false);
        // Here you can also make an API call to delete the users from the backend
    };

    const handleSearch = () => {
        fetchUsers();
    };

    const filteredUsers = users.filter(user =>
        (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchQuery.toLowerCase()) &&
        user.phoneNumber.includes(searchPhoneQuery)
    );

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;
    if (!users.length) return <div>Data not loaded correctly...</div>;

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Suppliers List</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className='my-3'>
                                <Col xl={3}>
                                    <FormControl
                                        placeholder="Search by name"
                                        aria-label="Search by name"
                                        aria-describedby="basic-addon2"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </Col>

                                <Col xl={3}>
                                    <FormControl
                                        placeholder="Search by phone"
                                        aria-label="Search by phone"
                                        aria-describedby="basic-addon2"
                                        value={searchPhoneQuery}
                                        onChange={(e) => setSearchPhoneQuery(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Button variant="danger" onClick={handleDeleteSelected} disabled={!selectedUsers.length}>
                                Delete Selected
                            </Button>
                            <Table striped responsive>
                                <thead>
                                    <tr>
                                        <th>
                                            <Form.Check
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>State</th>
                                        <th>CreatedAt</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(item.id)}
                                                    onChange={() => handleSelectUser(item.id)}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{item.firstName + ' ' + item.lastName}</h6>
                                                <p className="m-0">{item.phoneNumber}</p>
                                            </td>
                                            <td>{item.accountState}</td>
                                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                                            <td><Button onClick={() => navigate('/userdetails', { state: { item } })}>Details</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Suppliers;
