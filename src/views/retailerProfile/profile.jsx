import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, CardGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import avatar1 from '../../assets/images/user/avatar-2.jpg';
import './profile.css';
import { handleUpdateUserImage, handleUpdateUserStatus, hanldeGetAllOrdersByRetailerId, hanldeGetUserDetails } from 'apis/users';
import OrdersList from './ordersTable';
import Loader from 'components/Loader/Loader';
import ConfirmationModal from 'components/Modal/ConfirmOperation';

const Profile = () => {
    const location = useLocation();
    const { item } = location.state;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userdata, setUserdata] = useState({});
    const [userbasic, setuserBasic] = useState({});
    const [usermore, setuserMore] = useState({});
    const [currentPageProducts, setCurrentPageProducts] = useState(1);
    const [itemsPerPageProducts, setItemsPerPageProducts] = useState(5);
    const [currentPageOrders, setCurrentPageOrders] = useState(1);
    const [itemsPerPageOrders, setItemsPerPageOrders] = useState(5);
    const [imageBase64, setImageBase64] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);

    const clearState = () => {
        setProducts([]);
        setOrders([]);
        setUserdata({});
        setError('');
    };

    const fetchProfileData = async () => {
        setLoading(true);
        setError('');
        try {
            const [ordersResponse, userResponse] = await Promise.all([
                hanldeGetAllOrdersByRetailerId(item._id),
                hanldeGetUserDetails(item._id)
            ]);

            if (ordersResponse.data) {
                setOrders(ordersResponse.data);
            } else {
                setError('Failed to fetch orders');
            }
            if (userResponse.data) {
                setUserdata(userResponse.data);
                setuserMore(userResponse.data.more || {});
                setuserBasic(userResponse.data.basic || {});
                console.log(userResponse.data)
            } else {
                setError('Failed to fetch userdata');
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
    }, [item._id]);

    const handleProductsPageChange = (pageNumber) => {
        setCurrentPageProducts(pageNumber);
    };

    const handleOrdersPageChange = (pageNumber) => {
        setCurrentPageOrders(pageNumber);
    };

    const handleProductsItemsPerPageChange = (e) => {
        setItemsPerPageProducts(Number(e.target.value));
        setCurrentPageProducts(1);
    };

    const handleOrdersItemsPerPageChange = (e) => {
        setItemsPerPageOrders(Number(e.target.value));
        setCurrentPageOrders(1);
    };

    const handleUserStatusChange = async (accountState) => {
        const conf = window.confirm('Are you sure you want to perform this action?');
        if (conf) {
            setLoading(true);
            try {
                await handleUpdateUserStatus(item._id, item.phoneNumber, accountState);
                const updatedUserResponse = await hanldeGetUserDetails(item._id);
                setUserdata(updatedUserResponse.data);
                setuserMore(updatedUserResponse.data.more || {});
                setuserBasic(updatedUserResponse.data.basic || {});
            } catch (error) {
                setError('Failed to update user status');
            } finally {
                setLoading(false);
            }
        } else {
            console.log('Action cancelled');
        }
    };

    const handleDeleteUser = async () => {
        setModalMessage('Are you sure you want to delete this user?');
        setConfirmAction(() => async () => {
            setLoading(true);
            try {
                await handleDeleteUser(item._id);
                navigate('/supplier');
            } catch (error) {
                setError('Failed to delete user');
            } finally {
                setLoading(false);
                handleCloseModal();
            }
        });
        setShowModal(true);
    };

    const handleDeleteImage = async () => {
        setModalMessage('Are you sure you want to delete this image?');
        setConfirmAction(() => async () => {
            setLoading(true);
            try {
                await handleUpdateUserImage(item._id, item.phoneNumber);
                fetchProfileData();
            } catch (error) {
                setError('Failed to delete image');
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

    if (!item || !userbasic || !usermore) return <p>Loading...</p>;

    if (loading && !userdata._id && orders.length === 0 && products.length === 0) return <Loader />;

    return (
        <React.Fragment>
            <Container className="py-5">
                <Card className="">
                    <Card.Header className="theme-bg ProfileCardBackgroundImage" variant="top" />
                    <CardGroup>
                        <Button onClick={handleDeleteImage} className='deleteimg '> <i className="feather icon-trash" /></Button>
                        <Card.Img className="ProfileCardImage" alt="User Image" src={item.src || avatar1} />
                    </CardGroup>
                    <Card.Body className="text-center ProfileCardBody">
                        <Card.Text className="TextBold mt-5">
                            {item.firstName.toUpperCase()} {item.lastName.toUpperCase()}
                        </Card.Text>
                        <Card.Text className="TextMuted">
                            Tele: {item.phoneNumber}
                        </Card.Text>
                        <Card.Text className="TextMuted fw-bold">
                            Role:  {userbasic.role && userbasic.role.toUpperCase() || 'N/A'}
                        </Card.Text>
                        <Col>
                            <Button
                                variant={userbasic.accountState === 'active' ? 'warning' : 'success'}
                                onClick={() => handleUserStatusChange(userbasic.accountState === 'active' ? 'inactive' : 'active')}
                            >
                                {userbasic.accountState === 'active' ? 'Block User' : 'Activate User'}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant={'danger'}
                                onClick={handleDeleteUser}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Card.Body>
                    <Card.Footer className="CardFooter">
                        <Row>
                            {userbasic.accountState === 'inActive' &&
                                <Card.Text className='bg-warning'>
                                    Warning: This user is not active
                                </Card.Text>
                            }
                            <Card.Text>
                                Status:  <span className={`p-1 m-1 ${userbasic.accountState === 'active' ? 'bg-success' : 'bg-danger'} text-white rounded`}>
                                    {userbasic.accountState}
                                </span>
                            </Card.Text>
                            <Card.Text className="TextMuted fw-bold">
                                Business Name:  {usermore.businessName && usermore.businessName.toUpperCase() || 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                Address: {userbasic.exactAddress && userbasic.exactAddress.district || 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                Location: {usermore.location && usermore.location.display_name || 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                Favorite List: {
                                    usermore.favoriteSuppliers && usermore.favoriteSuppliers.length > 0 ? (
                                        usermore.favoriteSuppliers.map(item => (
                                            <span key={item._id} className='p-1 m-1 bg-info fw-bold text-white rounded'>{item.businessName}</span>
                                        ))
                                    ) : (
                                        'N/A'
                                    )
                                }
                            </Card.Text>


                            <Card.Text>
                                Category: {
                                    usermore.businessType ? (
                                        <span className='p-1 m-1 bg-info fw-bold text-white rounded'>{usermore.businessType.name}</span>
                                    ) : (
                                        'N/A'
                                    )
                                }
                            </Card.Text>

                            <Card.Text>
                                CreateAt: {new Date(userbasic.createdAt).toLocaleString() || 'N/A'}
                            </Card.Text>


                        </Row>
                    </Card.Footer>
                </Card>
            </Container>
            <Row>
                <Col>
                    <OrdersList
                        orders={orders}
                        currentPage={currentPageOrders}
                        itemsPerPage={itemsPerPageOrders}
                        onPageChange={handleOrdersPageChange}
                        onItemsPerPageChange={handleOrdersItemsPerPageChange}
                        loading={loading}
                        error={error}
                    />
                </Col>
            </Row>
            <ConfirmationModal
                show={showModal}
                handleClose={handleCloseModal}
                handleConfirm={confirmAction}
                message={modalMessage}
            />
        </React.Fragment>
    );
};

export default Profile;
