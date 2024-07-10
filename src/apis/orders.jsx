
import { api, handleApiError, handleApiResponseData, setAuthToken } from "./api";

export const hanldeGetAllOrders = async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/orders/all-orders', {  });
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};