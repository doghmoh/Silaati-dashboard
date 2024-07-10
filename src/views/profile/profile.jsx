import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import avatar1 from '../../assets/images/user/avatar-2.jpg';
import { hanldeGetAllOrdersByUser, hanldeGetPrdouctsBySupplier, hanldeGetUserDetails } from 'apis/users';
import ProductsList from './productsTable';
import OrdersList from './ordersTable';
import './profile.css'

const Profile = () => {
    const location = useLocation();
    const { item } = location.state;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [currentPageProducts, setCurrentPageProducts] = useState(1);
    const [itemsPerPageProducts, setItemsPerPageProducts] = useState(5);
    const [currentPageOrders, setCurrentPageOrders] = useState(1);
    const [itemsPerPageOrders, setItemsPerPageOrders] = useState(5);

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            setError('');
            try {
                const [productsResponse, ordersResponse, userResponse] = await Promise.all([
                    hanldeGetPrdouctsBySupplier(item._id),
                    hanldeGetAllOrdersByUser(item._id),
                    hanldeGetUserDetails(item._id)
                ]);
                if (productsResponse.data) {
                    setProducts(productsResponse.data);
                } else {
                    setError('Failed to fetch products');
                }

                if (ordersResponse.data) {
                    setOrders(ordersResponse.data);
                } else {
                    setError('Failed to fetch orders');
                }
                if (userResponse.data) {
                    setUserdata(userResponse.data);
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

    if (!item) return <p>Loading...</p>;

    return (
        <React.Fragment>
            <Container className="py-5">
                <Card className="">
                    <Card.Header className="theme-bg ProfileCardBackgroundImage" variant="top" />
                    <Card.Img className="ProfileCardImage" alt="User Image" src={item.src || avatar1} />
                    <Card.Body className="text-center ProfileCardBody">
                        <Card.Text className="TextBold mt-5">
                            {item.firstName} {item.lastName}
                        </Card.Text>
                        <Card.Text className="TextMuted">
                            Tele: {item.phoneNumber}
                        </Card.Text>
                        <Card.Text className="TextMuted fw-bold">
                            Type:  {userdata.more && userdata.more.supplierType}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="CardFooter">

                        <Row>
                            <Card.Text>
                                Status:  <span className='p-1 m-1 bg-success text-white rounded'> {userdata.basic && userdata.basic.accountState}</span>
                            </Card.Text>
                            <Card.Text>
                                Region: {userdata.more && userdata.more.region.map((item, index) => (
                                    <span key={index} className='p-1  theme-bg rounded m-1  text-white fw-bold'>{item.wilaya_name_ascii+', '+item.commune_name_ascii}</span>
                                ))}
                            </Card.Text>
                            <Card.Text>
                                Category: {userdata.more && userdata.more.productCategory.map((item, index) => (
                                    <span key={index} className='p-1 m-1 theme-bg2 rounded m-1  text-white fw-bold'>{item.name}</span>
                                ))}
                            </Card.Text>
                            <Card.Text>
                                Cout de Livraison:  {userdata.more && userdata.more.shippingPrice} DA
                            </Card.Text>
                            <Card.Text>
                                Temps de Livraison: {userdata.more && userdata.more.shippingTimeInHours} Jours
                            </Card.Text>
                            <Card.Text>
                                Minimum Quantity d'un Commande : {userdata.more && userdata.more.minOrderPrice}
                            </Card.Text>
                        </Row>
                    </Card.Footer>
                    <Card.Footer>
                        <Row xs="3" className="text-center mb-5">
                            <Col xl={6}>
                                <Card.Text className="TextBold FooterP">{orders.length}</Card.Text>
                                <Card.Text className="TextMuted">Orders</Card.Text>
                            </Col>
                            <Col xl={6}>
                                <Card.Text className="TextBold FooterP">{products.length}</Card.Text>
                                <Card.Text className="TextMuted">Products</Card.Text>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Container>
            <Row>
                <Col>
                    <ProductsList
                        products={products}
                        currentPage={currentPageProducts}
                        itemsPerPage={itemsPerPageProducts}
                        onPageChange={handleProductsPageChange}
                        onItemsPerPageChange={handleProductsItemsPerPageChange}
                        loading={loading}
                        error={error}
                    />
                </Col>
            </Row>
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
        </React.Fragment>
    );
};

export default Profile;
