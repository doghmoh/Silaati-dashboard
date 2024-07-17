import { handleCreateNewAds, handleGetAllAds, hanldeDeleteAds } from 'apis/ads';
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, Table } from 'react-bootstrap';

const MyFormComponent = () => {
    const [adsList, setAdsList] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const fetchAdsList = async () => {
        setLoading(true)
        try {
            const response= await handleGetAllAds();
            console.log(response.data)
            setAdsList('.........'.response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchAdsList()
    }, [])

    const handleSubmit = async (event) => {
        let type = 'advertisement';
        let src = imageBase64
        try {
            const { data } = await handleCreateNewAds(title, content, type, src);
            console.log(data)
            fetchAdsList()
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false)
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await hanldeDeleteAds(id);
            if (res) {
                alert('Ads deleted ')
                fetchAdsList()
            }
            else alert('operation failed')
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false)
        }
    };



    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(file);
            setImage(file);
            console.log(file)
        }
    };
    if (loading) <div>Loading...</div>;
    if (error) <div>{error}</div>
    return (
        <Row>
            <Col sm={12}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Add New Announcements</Card.Title>
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
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formImage">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageUpload}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                                SAVE
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
                                {adsList && adsList.map(item => (
                                    <tr key={item._id}>
                                        <th scope="row">{item.title}</th>
                                        <td>{item.content}</td>
                                        <td>{item.type}</td>
                                        <td><img src={item.src} width={100} height={50} /></td>
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
