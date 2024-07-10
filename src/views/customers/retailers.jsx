import { hanldeGetAllUsers } from 'apis/users';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const Retailers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [users, setUsers] = useState('');

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
    if (!users) return null
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
                                        <th>State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((item) =>
                                    (
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>{item.firstName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.accountState}</td>
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
