import PropTypes from 'prop-types';
import React, { createContext, useReducer } from 'react';
import auth, { initialState } from 'store/accountReducer';
import { LOGIN, LOGOUT, REGISTER } from 'store/actions';



const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {

  // Initial state for authentication
  const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
  };
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case REGISTER: {
        const { user } = action.payload;
        return {
          ...state,
          user
        };
      }
      case LOGIN: {
        const { user } = action.payload;
        return {
          ...state,
          isLoggedIn: true,
          isInitialized: true,
          user
        };
      }
      case LOGOUT: {
        return {
          ...state,
          isInitialized: true,
          isLoggedIn: false,
          user: null
        };
      }
      default: {
        return { ...state };
      }
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.object
};

export { AuthContext, AuthProvider };
