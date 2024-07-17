import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, Table } from 'react-bootstrap';
import { handleCreateNewAds, handleGetAllAds, hanldeDeleteAds } from 'apis/ads'; // Ensure correct import path for your API functions
import Loader from 'components/Loader/Loader'; // Assuming Loader component exists for showing loading state

const MyFormComponent = () => {
    const [adsList, setAdsList] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [adType, setAdType] = useState('advertisement'); // State for selected ad type
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchAdsList = async () => {
        setLoading(true);
        try {
            const response = await handleGetAllAds();
            console.log(response.data);
            setAdsList(response.data || []);
        } catch (err) {
            setError('Failed to fetch ads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdsList();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await handleCreateNewAds(title, content, adType, imageBase64);
            console.log(data);
            fetchAdsList();
            setTitle('');
            setContent('');
            setImage(null);
            setImageBase64('');
        } catch (err) {
            setError('Failed to create new ad');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await hanldeDeleteAds(id);
            if (res) {
                alert('Ad deleted');
                fetchAdsList();
            } else {
                alert('Operation failed');
            }
        } catch (err) {
            setError('Failed to delete ad');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; // Max width for resized image
                    const MAX_HEIGHT = 600; // Max height for resized image
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const resizedBase64 = canvas.toDataURL('image/jpeg'); // Change to 'image/png' if needed

                    setImageBase64(resizedBase64);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };


    if (loading) return <Loader />;

    return (
        <Row>
            <Col sm={12}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Add New Announcement</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContent">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={adType}
                                    onChange={(e) => setAdType(e.target.value)}
                                    required
                                >
                                    <option value="advertisement">Advertisement</option>
                                    <option value="info">Info</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formImage">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>

            <Col xl={12}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Announcements List</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Type</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adsList.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.content}</td>
                                        <td>
                                            <span className={`bg-${item.type === 'advertisement' ? 'warning' : 'info'} text-white rounded p-1`}>
                                                {item.type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td><img src={item.src} alt="Ad" style={{ maxWidth: '100px', maxHeight: '50px' }} /></td>
                                        <td><Button onClick={() => handleDelete(item._id)}>Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default MyFormComponent;
