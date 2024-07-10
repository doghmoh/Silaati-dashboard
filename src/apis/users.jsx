
import { api, handleApiError, handleApiResponseData, setAuthToken } from "./api";

export const hanldeGetAllUsers = async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/users/all-users-basic', {  });
        return handleApiResponseData(response, 'Get All Users Successfully', 'Get Users failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const hanldeGetUserDetails = async (supplierId) => {
    try {
        setAuthToken()
        const response = await api.get(`api/v1/users/${supplierId}/more`, {  });
        return handleApiResponseData(response, 'Get User DATA Successfully', 'Get User DATA failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeGetPrdouctsBySupplier = async (supplierId) => {
    try {
        setAuthToken()
        const response = await api.get(`api/v1/suppliers/${supplierId}/products`, {  });
        return handleApiResponseData(response, 'Get All Products Successfully', 'Get Products failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeGetAllOrdersByUser = async (supplierId) => {
    try {
        setAuthToken()
        const response = await api.get(`api/v1/suppliers/${supplierId}/orders`, {  });
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};