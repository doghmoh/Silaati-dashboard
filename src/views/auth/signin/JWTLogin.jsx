import React, { useContext, useReducer, useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LOGIN } from '../../../store/actions';
import { handleLogin } from 'apis/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts/userContext';

const JWTLogin = () => {
  const configContext = useContext(AuthContext);
  const { dispatch } = configContext;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePressLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    setError('');
    const { phoneNumber, password } = values;

    try {
      // Assuming handleLogin is an async function that handles the login request
      const response = await handleLogin(phoneNumber, password);

      if (response.status) {
        setError('');
        const userdata = response.data;

        // Dispatching the LOGIN action to update the Redux state
        dispatch({ type: LOGIN, payload: { user :userdata } });

        // Storing user data and tokens in AsyncStorage
         localStorage.setItem('userdata', JSON.stringify(userdata));
         localStorage.setItem('userId', userdata.user._id);
         localStorage.setItem('role', userdata.user.role);
         localStorage.setItem('accessToken', userdata.accessToken);
         localStorage.setItem('refreshToken', userdata.refreshToken);
         console.log(userdata.user.role)

        // Navigating to the dashboard upon successful login
        navigate('/api/v1/dashboard');
      } else {
        setError('Username or password is invalid');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };


  return (
    <Formik
      initialValues={{
        phoneNumber: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        phoneNumber: Yup.string()
          .matches(/^[0-9]{10}$/, 'Must be a valid phone number')
          .required('Phone number is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      })}
      onSubmit={handlePressLogin}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              placeholder="Phone Number"
              name="phoneNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.phoneNumber}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <small className="text-danger form-text">{errors.phoneNumber}</small>
            )}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && (
              <small className="text-danger form-text">{errors.password}</small>
            )}
          </div>

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {error && (
            <Col sm={12}>
              <Alert variant="danger">{error}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button
                className="btn-block mb-4"
                color="primary"
                disabled={isSubmitting || loading}
                size="large"
                type="submit"
                variant="primary"
              >
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
