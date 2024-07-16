
import { api, handleApiError, handleApiResponseData, setAuthToken } from "./api";

export const hanldeGetAllProductCategory= async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/productCategories/all-productCategories', {});
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeAddProductCategory= async () => {
    try {
        setAuthToken()
        const response = await api.post('api/v1/productCategories/new-productCategories', {});
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeDeleteProductCategory= async (id) => {
    try {
        setAuthToken()
        const response = await api.delete(`api/v1/productCategories/${id}`, {});
        return handleApiResponseData(response, 'delete Successfully', 'delete failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const hanldeGetAllItemType= async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/itemTypes/all-itemTypes', {});
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeAddItemType= async () => {
    try {
        setAuthToken()
        const response = await api.post('api/v1/itemTypes/new-itemTypes', {});
        return handleApiResponseData(response, 'add Successfully', 'add failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const hanldeDeleteItemType= async (id) => {
    try {
        setAuthToken()
        const response = await api.delete(`api/v1/itemTypes/${id}`, {});
        return handleApiResponseData(response, 'delete Successfully', 'delete failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const hanldeGetAllPackagingType= async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/packagingTypes/all-packagingTypes', {});
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};
export const hanldeAddPackagingType= async () => {
    try {
        setAuthToken()
        const response = await api.post('api/v1/packagingTypes/new-packagingTypes', {});
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeDeletePackagingType= async (id) => {
    try {
        setAuthToken()
        const response = await api.delete(`api/v1/packagingTypes/${id}`, {});
        return handleApiResponseData(response, 'Delete Successfully', 'Delete failed');
    } catch (error) {
        handleApiError(error);
    }
};



export const hanldeGetAllBusinessType= async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/businessTypes/all-businessTypes', {});
        return handleApiResponseData(response, 'Get All Successfully', 'Get all failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const hanldeAddBusinessType= async () => {
    try {
        setAuthToken()
        const response = await api.post('api/v1/businessTypes/new-businessTypes', {});
        return handleApiResponseData(response, 'add Successfully', 'add failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const hanldeDeleteBusinessType= async (id) => {
    try {
        setAuthToken()
        const response = await api.delete(`api/v1/businessTypes/${id}`, {});
        return handleApiResponseData(response, 'delete Successfully', 'delete failed');
    } catch (error) {
        handleApiError(error);
    }
};

