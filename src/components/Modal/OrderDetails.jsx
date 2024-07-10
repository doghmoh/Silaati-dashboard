import React from 'react';
import {
    Card,
    Col,
    Container,
    ProgressBar,
    Row,
} from 'react-bootstrap';

export default function OrderDetails({ order }) {
    if (!order) return <div>data missing</div>
    return (
        <>
            <section className="h-100 gradient-custom" style={{ backgroundColor: '#eee' }}>
                <Container className="h-100 p-0">
                    <Row className="justify-content-center align-items-center h-100 p-0 ">
                        <Col md="10" lg="12" xl="12">
                            <Card style={{ borderRadius: '10px' }}>
                                <Card.Body className="p-2">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}>
                                            Order #{order._id}
                                        </p>
                                    </div>

                                    <Card className="shadow-0 border mb-4">
                                        <Card.Body>
                                            {order.products.map((item, index) =>
                                            (
                                                <Row key={index}>
                                                    <Col md="2" className='p-2'>
                                                        <Card.Img src={item.src} fluid alt="Item" height={100} />
                                                    </Col>
                                                    <Col md="2" className="text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0">{item.name}</p>
                                                    </Col>
                                                    <Col md="3" className="text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Prix: {item.finalPrice ? item.finalPrice : item.originalPrice} DA</p>
                                                    </Col>
                                                    <Col md="2" className="text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Qty: {item.qty}</p>
                                                    </Col>
                                                    <Col md="3" className="text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small fw-bold">Total: {item.finalSubTotal} DA</p>
                                                    </Col>
                                                </Row>
                                            )
                                            )}
                                        </Card.Body>
                                    </Card>

                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="fw-bold mb-0">Order Details</p>
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Total</span> {order.payment.finalTotal} DA
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="text-muted mb-0">Invoice Number : 788152</p>
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Discount</span> 0.00 DA
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">Invoice Date : {new Date(order.updatedAt).toLocaleString()}</p>
                                    </div>

                                    <div className="d-flex justify-content-between mb-5">
                                        <p className="text-muted mb-0">To Retailer : {order.retailerInfos.firstName + ' ' + order.retailerInfos.lastName + ' '+ order.retailerInfos.businessName} </p>
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Delivery Charges</span> {order.supplierInfos.shippingPrice} DA
                                        </p>
                                    </div>
                                </Card.Body>
                                <Card.Footer
                                    className="border-0 px-4 py-5"
                                    style={{
                                        backgroundColor: '#a8729a',
                                        borderBottomLeftRadius: '10px',
                                        borderBottomRightRadius: '10px',
                                    }}
                                >
                                    <h3
                                        as="h5"
                                        className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                                    >
                                        Total paid: <span className="h2 mb-0">{order.payment.finalTotal} DA</span>
                                    </h3>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
