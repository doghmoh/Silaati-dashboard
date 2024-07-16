import { hanldeGetAllUsers } from 'apis/users';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import { useNavigate } from 'react-router-dom';

const Retailers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [users, setUsers] = useState('');
    const navigate = useNavigate()
    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await hanldeGetAllUsers();
            if (response) {
                setError('')
                setUsers(response.data.filter(item => item.role === 'retailer'))
                console.log('aaaaaaaaaaaaaaaa', response.data)
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
    }, [])

    if (loading) return <Loader />
    if (error) return <div>{error}</div>
    if (!users) return <div>data not loaded correctly...</div>
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Retailer List </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>CreatedAt</th>
                                        <th>State</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((item) =>
                                    (
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>
                                                <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                                            </td>
                                            <td>
                                                <h6 className="mb-1">{item.firstName + ' ' + item.lastName}</h6>
                                                <p className="m-0">{item.phoneNumber}</p>
                                            </td>
                                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                                            <td>{item.accountState}</td>
                                            <td><Button onClick={() => navigate('/retailerdetails', { state: { item } })}>Details</Button></td>
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Retailers;
