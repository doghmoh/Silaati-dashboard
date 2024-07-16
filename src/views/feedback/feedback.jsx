import { handleDeleteFeedback, handleGetALlFeedback } from 'apis/users';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState([]);
    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await handleGetALlFeedback();
            if (response) {
                setError('')
                setFeedback(response.data)
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
    if (!feedback) return <div>data not loaded correctly...</div>
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Feedback List </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User</th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>CreatedAt</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedback.map((item) =>
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
                                            <td>{item.title}</td>
                                            <td>{item.content}</td>
                                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                                            <td><Button onClick={() => handleDeleteFeedback(item._id)}>Delete</Button></td>
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

export default Feedback;
