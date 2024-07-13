
import { api, handleApiError, handleApiResponseData, setAuthToken } from "./api";

export const hanldeGetAllOrders = async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/orders/all-orders', {});
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const handleGetAllProducts = async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/products/all-products', {});
        return handleApiResponseData(response, 'Get All products Successfully', 'Get products failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const handleDeleteProduct = async (id) => {
    try {
        setAuthToken()
        const response = await api.delete(`api/v1/products/${id}`, {});
        return handleApiResponseData(response, 'Delete products Successfully', 'Delete products failed');
    } catch (error) {
        handleApiError(error);
    }
};