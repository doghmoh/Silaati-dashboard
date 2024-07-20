import React, { useContext, useEffect, useState } from 'react';
import { Card, ListGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ChatList from './ChatList';

import avatar1 from '../../../../assets/images/user/avatar-2.jpg';
import { AuthContext } from 'contexts/userContext';
import { LOGOUT } from 'store/actions';
import { handleLogout } from 'apis/api';

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);
  const [username, setUsername] = useState('')
  const configContext = useContext(AuthContext);
  const { dispatch } = configContext;
  const userdata = JSON.parse(localStorage.getItem('userdata'))

  useEffect(() => {
    const { firstName, lastName } = userdata.user;
    setUsername(firstName + ' ' + lastName);
  }, [userdata])

  const navigate = useNavigate()
  const handleLogoutt = async () => {
    try {
      await handleLogout();
      dispatch({ type: LOGOUT });

      // Storing user data and tokens in AsyncStorage
      localStorage.removeItem('userdata');
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="end">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="feather icon-bell icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="notification notification-scroll">
              <div className="noti-head">
                <h6 className="d-inline-block m-b-0">Notifications</h6>
                <div className="float-end">
                  <Link to="#" className="me-2">
                    mark as read
                  </Link>
                  <Link to="#">clear all</Link>
                </div>
              </div>
              <PerfectScrollbar>
                <ListGroup as="ul" bsPrefix=" " variant="flush" className="noti-body">
                  <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                    <p className="m-b-0">NEW</p>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" " className="notification">
                    <Card
                      className="d-flex align-items-center shadow-none mb-0 p-0"
                      style={{ flexDirection: 'row', backgroundColor: 'unset' }}
                    >
                      <img className="img-radius" src={avatar1} alt="Generic placeholder" />
                      <Card.Body className="p-0">
                        <p>
                          <strong>John Doe</strong>
                          <span className="n-time text-muted">
                            <i className="icon feather icon-clock me-2" />
                            30 min
                          </span>
                        </p>
                        <p>New ticket Added</p>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                    <p className="m-b-0">EARLIER</p>
                  </ListGroup.Item>
                  {/* {notiData.map((data, index) => {
                    return (
                      <ListGroup.Item key={index} as="li" bsPrefix=" " className="notification">
                        <Card
                          className="d-flex align-items-center shadow-none mb-0 p-0"
                          style={{ flexDirection: 'row', backgroundColor: 'unset' }}
                        >
                          <img className="img-radius" src={data.image} alt="Generic placeholder" />
                          <Card.Body className="p-0">
                            <p>
                              <strong>{data.name}</strong>
                              <span className="n-time text-muted">
                                <i className="icon feather icon-clock me-2" />
                                {data.activity}
                              </span>
                            </p>
                            <p>{data.details}</p>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    );
                  })} */}
                </ListGroup>
              </PerfectScrollbar>
              <div className="noti-footer">
                <Link to="#">show all</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align={'end'} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>{username}</span>
                <Link onClick={handleLogoutt} className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
