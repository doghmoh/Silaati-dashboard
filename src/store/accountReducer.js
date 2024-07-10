import { REGISTER, LOGIN, LOGOUT } from './actions';

// Initial state for authentication
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// Reducer function for handling authentication actions
const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user } = action.payload; console.log('calllllll')
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
};

export default auth;
