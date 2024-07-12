import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Pagination, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { handleStats } from 'apis/dashboard';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import PieDonutChart2 from 'views/charts/nvd3-chart/chart/PieDonutChart2';
import GroupedColumnChart from 'views/charts/nvd3-chart/chart/GroupedChart';
import { hanldeGetAllUsers } from 'apis/users';
import PieDonutChart from 'views/charts/nvd3-chart/chart/PieDonutChart';
import BarDiscreteChart from 'views/charts/nvd3-chart/chart/BarDiscreteChart';
import LineChart from 'views/charts/nvd3-chart/chart/LineChart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from 'contexts/userContext';

const dashSalesData = [
  { title: 'Daily Sales', amount: '$249.95', icon: 'icon-arrow-up text-c-green', value: 50, class: 'progress-c-theme' },
  { title: 'Monthly Sales', amount: '$2.942.32', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
  { title: 'Yearly Sales', amount: '$8.638.32', icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
];

const initialData = [
  { wilayacode: '01', wilayaname: 'Adrar', supplier: 0, retailer: 0 },
  { wilayacode: '02', wilayaname: 'Chlef', supplier: 0, retailer: 0 },
  { wilayacode: '03', wilayaname: 'Laghouat', supplier: 0, retailer: 0 },
  { wilayacode: '04', wilayaname: 'Oum El Bouaghi', supplier: 0, retailer: 0 },
  { wilayacode: '05', wilayaname: 'Batna', supplier: 0, retailer: 0 },
  { wilayacode: '06', wilayaname: 'Béjaïa', supplier: 0, retailer: 0 },
  { wilayacode: '07', wilayaname: 'Biskra', supplier: 0, retailer: 0 },
  { wilayacode: '08', wilayaname: 'Béchar', supplier: 0, retailer: 0 },
  { wilayacode: '09', wilayaname: 'Blida', supplier: 0, retailer: 0 },
  { wilayacode: '10', wilayaname: 'Bouira', supplier: 0, retailer: 0 },
  { wilayacode: '11', wilayaname: 'Tamanrasset', supplier: 0, retailer: 0 },
  { wilayacode: '12', wilayaname: 'Tébessa', supplier: 0, retailer: 0 },
  { wilayacode: '13', wilayaname: 'Tlemcen', supplier: 0, retailer: 0 },
  { wilayacode: '14', wilayaname: 'Tiaret', supplier: 0, retailer: 0 },
  { wilayacode: '15', wilayaname: 'Tizi Ouzou', supplier: 0, retailer: 0 },
  { wilayacode: '16', wilayaname: 'Alger', supplier: 0, retailer: 0 },
  { wilayacode: '17', wilayaname: 'Djelfa', supplier: 0, retailer: 0 },
  { wilayacode: '18', wilayaname: 'Jijel', supplier: 0, retailer: 0 },
  { wilayacode: '19', wilayaname: 'Sétif', supplier: 0, retailer: 0 },
  { wilayacode: '20', wilayaname: 'Saïda', supplier: 0, retailer: 0 },
  { wilayacode: '21', wilayaname: 'Skikda', supplier: 0, retailer: 0 },
  { wilayacode: '22', wilayaname: 'Sidi Bel Abbès', supplier: 0, retailer: 0 },
  { wilayacode: '23', wilayaname: 'Annaba', supplier: 0, retailer: 0 },
  { wilayacode: '24', wilayaname: 'Guelma', supplier: 0, retailer: 0 },
  { wilayacode: '25', wilayaname: 'Constantine', supplier: 0, retailer: 0 },
  { wilayacode: '26', wilayaname: 'Médéa', supplier: 0, retailer: 0 },
  { wilayacode: '27', wilayaname: 'Mostaganem', supplier: 0, retailer: 0 },
  { wilayacode: '28', wilayaname: 'M\'sila', supplier: 0, retailer: 0 },
  { wilayacode: '29', wilayaname: 'Mascara', supplier: 0, retailer: 0 },
  { wilayacode: '30', wilayaname: 'Ouargla', supplier: 0, retailer: 0 },
  { wilayacode: '31', wilayaname: 'Oran', supplier: 0, retailer: 0 },
  { wilayacode: '32', wilayaname: 'El Bayadh', supplier: 0, retailer: 0 },
  { wilayacode: '33', wilayaname: 'Illizi', supplier: 0, retailer: 0 },
  { wilayacode: '34', wilayaname: 'Bordj Bou Arreridj', supplier: 0, retailer: 0 },
  { wilayacode: '35', wilayaname: 'Boumerdès', supplier: 0, retailer: 0 },
  { wilayacode: '36', wilayaname: 'El Tarf', supplier: 0, retailer: 0 },
  { wilayacode: '37', wilayaname: 'Tindouf', supplier: 0, retailer: 0 },
  { wilayacode: '38', wilayaname: 'Tissemsilt', supplier: 0, retailer: 0 },
  { wilayacode: '39', wilayaname: 'El Oued', supplier: 0, retailer: 0 },
  { wilayacode: '40', wilayaname: 'Khenchela', supplier: 0, retailer: 0 },
  { wilayacode: '41', wilayaname: 'Souk Ahras', supplier: 0, retailer: 0 },
  { wilayacode: '42', wilayaname: 'Tipaza', supplier: 0, retailer: 0 },
  { wilayacode: '43', wilayaname: 'Mila', supplier: 0, retailer: 0 },
  { wilayacode: '44', wilayaname: 'Aïn Defla', supplier: 0, retailer: 0 },
  { wilayacode: '45', wilayaname: 'Naâma', supplier: 0, retailer: 0 },
  { wilayacode: '46', wilayaname: 'Aïn Témouchent', supplier: 0, retailer: 0 },
  { wilayacode: '47', wilayaname: 'Ghardaïa', supplier: 0, retailer: 0 },
  { wilayacode: '48', wilayaname: 'Relizane', supplier: 0, retailer: 0 }
];


const DashDefault = () => {

  const navigate = useNavigate();
  const [orderStats, setOrderStats] = useState(null);
  const [userList, setUserList] = useState([]);
  const [userRelatedStats, setUserRelatedStats] = useState(null);
  const [topProductsSold, setTopProductsSold] = useState(null);
  const [retailersSpendStats, setRetailersSpendStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const data = await handleStats();
        console.log(data)
        setOrderStats(data.orderStats);
        setUserRelatedStats(data.userRelatedStats);
        setTopProductsSold(data.topProductsSold);
        setRetailersSpendStats(data.retailersSpendStats);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchUserList = async () => {
      setLoading(true)
      try {
        const { data } = await hanldeGetAllUsers();
        console.log(data)
        setUserList(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false)
      }
    };

    fetchOrderStats();
    fetchUserList()
  }, []);

  const [wilayas, setWilayaData] = useState(initialData);
  const [sortBy, setSortBy] = useState('supplier'); // Default sort by supplier
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order


  useEffect(() => {
    // Update supplier and retailer counts based on locationStats changes
    if (userRelatedStats && userRelatedStats.locationStats) {
      const updatedWilayaData = wilayas.map(wilaya => {
        const supplierData = userRelatedStats && userRelatedStats.locationStats.suppliersByWilaya[wilaya.wilayacode];
        const retailerData = userRelatedStats && userRelatedStats.locationStats.retailersByWilaya[wilaya.wilayacode];
        return {
          ...wilaya,
          supplier: supplierData ? supplierData.count : wilaya.supplier,
          retailer: retailerData ? retailerData.count : wilaya.retailer
        };
      });

      setWilayaData(updatedWilayaData);

      // Sort wilayas based on sortBy and sortOrder
      updatedWilayaData.sort((a, b) => {
        const sortFieldA = sortBy === 'supplier' ? a.supplier : a.retailer;
        const sortFieldB = sortBy === 'supplier' ? b.supplier : b.retailer;

        if (sortOrder === 'asc') {
          return sortFieldA - sortFieldB;
        } else {
          return sortFieldB - sortFieldA;
        }
      });

      setWilayaData(updatedWilayaData);
    }
  }, [userRelatedStats && userRelatedStats.locationStats, sortBy, sortOrder]); // Update when locationStats or sorting criteria changes

  const handleSort = (criteria) => {
    if (criteria === sortBy) {
      // Toggle sort order if sorting by the same criteria
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sorting criteria and default to descending order
      setSortBy(criteria);
      setSortOrder('desc');
    }
  };


  if (loading && !userRelatedStats) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const sampleData = [
    { key: 'Admin', y: userRelatedStats.userStats.roleStats.admin, color: '#ff8a65' },
    { key: 'Suppliers', y: userRelatedStats.userStats.roleStats.supplier, color: '#f4c22b' },
    { key: 'Retailers', y: userRelatedStats.userStats.roleStats.retailer, color: '#04a9f5' },
    { key: 'Company', y: userRelatedStats.userStats.roleStats.courier, color: '#3ebfea' }
  ];
  const sampleData2 = [
    { key: 'Active', y: userRelatedStats.userStats.accountStateStats.active, color: '#ff8a65' },
    { key: 'inActive', y: userRelatedStats.userStats.accountStateStats.inactive, color: '#f4c22b' },
    { key: 'Banned', y: userRelatedStats.userStats.accountStateStats.banned, color: '#04a9f5' },
    { key: 'New', y: userRelatedStats.userStats.accountStateStats.new, color: '#3ebfea' }
  ];


  const tabContent = (
    <React.Fragment>
      {topProductsSold && topProductsSold.topProducts.map((item) => (
        <div key={item._id} className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table flex-shrink-0">
            <Link to="#">
              <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
            </Link>
          </div>
          <div className="flex-grow-1 ms-3">
            <h6 className="m-0 d-inline">{item.productName}</h6>
            <span className="float-end d-flex align-items-center">
              <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
              {item.totalQuantity}
            </span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );


  return (
    <React.Fragment>
      <Row>
        <Col xl={3} >
          <Card>
            <Card.Body>
              <h6 className="mb-4">Total Order</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-1 f-30 m-r-5`} />{orderStats.total}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0"></p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Completed Order</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-1 f-30 m-r-5`} />{orderStats.completed}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0"></p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Cancelled Order</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-1 f-30 m-r-5`} />{orderStats.cancelled}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0"></p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Pending Order</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-1 f-30 m-r-5`} />{orderStats.processing}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0"></p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={8}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">Recent Users</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  {userList && userList.slice(0, 5).map((item) =>
                  (
                    <tr className="unread" key={item._id}>
                      <td>
                        <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                      </td>
                      <td>
                        <h6 className="mb-1">{item.firstName + ' ' + item.lastName}</h6>
                        <p className="m-0">{item.phoneNumber}</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          {new Date(item.createdAt).toLocaleString()}
                        </h6>
                      </td>
                      <td>
                        <Link to="#" className="label theme-bg2 text-white f-12">
                          {item.role}
                        </Link>
                        <Link to="#" className="label theme-bg text-white f-12">
                          {item.accountState}
                        </Link>
                      </td>
                    </tr>
                  )
                  )}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <Link href='#' >Show more</Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={4}>
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Upcoming Event</h5>
                </div>
                <div className="col-auto">
                  <label className="label theme-bg2 text-white f-14 f-w-400 float-end">34%</label>
                </div>
              </div>
              <h2 className="mt-2 f-w-300">
                45<sub className="text-muted f-14">Competitors</sub>
              </h2>
              <h6 className="text-muted mt-3 mb-0">You can participate in event </h6>
              <i className="fab fa-angellist text-c-purple f-50" />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-zap f-30 text-c-green" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">{userRelatedStats.userStats.total}</h3>
                  <span className="d-block text-uppercase">Total Users</span>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-map-pin f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">26</h3>
                  <span className="d-block text-uppercase">total locations</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-facebook-f text-primary f-36" />
                </div>
                <div className="col text-end">
                  <h3>12,281</h3>
                  <h5 className="text-c-green mb-0">
                    +7.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>35,098
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '60%', height: '6px' }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>350
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme2"
                      role="progressbar"
                      style={{ width: '45%', height: '6px' }}
                      aria-valuenow="45"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-twitter text-c-blue f-36" />
                </div>
                <div className="col text-end">
                  <h3>11,200</h3>
                  <h5 className="text-c-purple mb-0">
                    +6.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>34,185
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-green"
                      role="progressbar"
                      style={{ width: '40%', height: '6px' }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>800
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-blue"
                      role="progressbar"
                      style={{ width: '70%', height: '6px' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-google-plus-g text-c-red f-36" />
                </div>
                <div className="col text-end">
                  <h3>10,500</h3>
                  <h5 className="text-c-blue mb-0">
                    +5.9% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>25,998
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '80%', height: '6px' }}
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>900
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme2"
                      role="progressbar"
                      style={{ width: '50%', height: '6px' }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Rating</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row align-items-center justify-content-center m-b-20">
                <div className="col-6">
                  <h2 className="f-w-300 d-flex align-items-center float-start m-0">
                    4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                  </h2>
                </div>
                <div className="col-6">
                  <h6 className="d-flex  align-items-center float-end m-0">
                    0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                  </h6>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                  </h6>
                  <h6 className="align-items-center float-end">384</h6>
                  <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '70%' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />4
                  </h6>
                  <h6 className="align-items-center float-end">145</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '35%' }}
                      aria-valuenow="35"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />3
                  </h6>
                  <h6 className="align-items-center float-end">24</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '25%' }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />2
                  </h6>
                  <h6 className="align-items-center float-end">1</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '10%' }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />1
                  </h6>
                  <h6 className="align-items-center float-end">0</h6>
                  <div className="progress m-t-30  m-b-5" style={{ height: '6px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '0%' }}
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={8} className="user-activity">
          <Card>
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Today">
                {tabContent}
                <Link href='#' className='d-flex justify-content-end' >Show more</Link>
              </Tab>
              <Tab eventKey="week" title="This Week">
                {tabContent}
                <Link href='#' className='d-flex justify-content-end' >Show more</Link>
              </Tab>
              <Tab eventKey="all" title="All">
                {tabContent}
                <Link href='#' className='d-flex justify-content-end' >Show more</Link>
              </Tab>
            </Tabs>
          </Card>
        </Col>
        <Col xl={4}>
          <div className='card'>
            <PieDonutChart data={sampleData} />
          </div>
        </Col>
        <Col xl={4}>
          <div className='card'>
            <PieDonutChart2 data={sampleData2} />
          </div>
        </Col>

        <Col xl={5}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">User By wilaya List</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive style={{ height: 500 + 'px', overflow: 'scroll' }}>
                <thead>
                  <tr>
                    <th>Wilaya Code</th>
                    <th>Wilaya Name</th>
                    <th>
                      <button
                        className="sort-button"
                        onClick={() => handleSort('supplier')}
                      >
                        {sortBy === 'supplier' && (
                          <span >
                            {sortOrder === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </button>
                      Supplier
                    </th>
                    <th>
                      <button
                        className="sort-button"
                        onClick={() => handleSort('retailer')}
                      >
                        {sortBy === 'retailer' && (
                          <span>
                            {sortOrder === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </button>
                      Retailer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wilayas.map(wilaya => (
                    <tr key={wilaya.wilaya_name_ascii}>
                      <th scope="row">{wilaya.wilayacode}</th>
                      <td>{wilaya.wilayaname}</td>
                      <td>{wilaya.supplier}</td>
                      <td>{wilaya.retailer}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={7}>
          <div className='card'>
            <GroupedColumnChart data={retailersSpendStats.graphData} />
          </div>
        </Col>
      </Row>
    </React.Fragment >
  );
};

export default DashDefault;
