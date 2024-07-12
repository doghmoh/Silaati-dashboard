import axios from 'axios';


 const apiUrl = import.meta.env.VITE_APP_API_URL;
 const apiKey = import.meta.env.VITE_APP_API_KEY

export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = async () => {

    const accessToken =  localStorage.getItem('accessToken');
    if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const handleApiError = (error) => {
    if (error.response) {
        if (error.response.status === 422) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.response.status, error.response.data);
        }
    } else if (error.request) {
        console.log('No response received:', error.message);
    } else {
        console.log('Error', error.message);
    }
};

export const handleApiResponseBoolean = (response, successMessage, failedMessage) => {
    if (response.status === 200 || response.status === 201) {
        console.log(successMessage);
        return true;
    } else {
        console.error(failedMessage);
        return false;
    }
};

export const handleApiResponseData = (response, successMessage, failedMessage) => {
    if (response.status === 200 || response.status === 201) {
        console.log(successMessage);
        return response.data;
    } else {
        console.error(failedMessage);
        return false;
    }
};

export const handleApiResponseCustom = (response, successMessage, failedMessage) => {
    if (response.status === 200 || response.status === 201) {
        console.log(successMessage);
        return { status: true, data: response.data };
    } else {
        console.error(failedMessage);
        return { status: false };
    }
};

export const handleLogin = async (phoneNumber, password) => {
    try {
        const response = await api.post('/api/v1/login', { phoneNumber, password });
        return handleApiResponseCustom(response, 'User login successfully', 'Login failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const handleLogout = async () => {
    try {
        await setAuthToken();
        const response = await api.post('/api/v1/logout');
        return handleApiResponseBoolean(response, 'Logout successfully', 'Logout failed');
    } catch (error) {
        handleApiError(error);
    }
};
