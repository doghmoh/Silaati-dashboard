
import { api, handleApiError, handleApiResponseData, setAuthToken } from "./api";

export const hanldeGetAllUsers = async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/users/all-users-basic', {});
        return handleApiResponseData(response, 'Get All Users Successfully', 'Get Users failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const hanldeGetAdmin = async (id) => {
    try {
        setAuthToken()
        const response = await api.get(`api/v1/users/all-mods`, {});
        return handleApiResponseData(response, 'Get User DATA Successfully', 'Get User DATA failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const handleCreateAgents = async (newAgent) => {
    const { firstName, lastName, phoneNumber, password } = newAgent
    const role = 'agent'
    try {
        setAuthToken()
        const response = await api.post(`api/v1/register`, { firstName, lastName, phoneNumber, role, password });
        return handleApiResponseData(response, 'create agents  Successfully', 'create agents  failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeGetUserDetails = async (supplierId) => {
    try {
        setAuthToken()
        const response = await api.get(`api/v1/users/${supplierId}/more`, {});
        return handleApiResponseData(response, 'Get User DATA Successfully', 'Get User DATA failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeGetPrdouctsBySupplier = async (supplierId) => {
    try {
        setAuthToken()
        const response = await api.get(`api/v1/suppliers/${supplierId}/products`, {});
        return handleApiResponseData(response, 'Get All Products Successfully', 'Get Products failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const hanldeGetAllOrdersByUser = async (supplierId) => {
    try {
        setAuthToken()
        const response = await api.get(`api/v1/suppliers/${supplierId}/orders`, {});
        return handleApiResponseData(response, 'Get All Orders Successfully', 'Get Orders failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const handleUpdateUserStatus = async (userId, phoneNumber, accountState) => {
    try {
        setAuthToken()
        const response = await api.put(`api/v1/users/${userId}/accountParams`, { phoneNumber, accountState });
        console.log(response.data)
        return handleApiResponseData(response, 'Updated user data Successfully', 'Updated user data failed');
    } catch (error) {
        handleApiError(error);
    }
}


export const handleUpdateUserImage = async (userId, phoneNumber) => {

    try {
        const src = 'data:image/png;base64,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'
        setAuthToken();
        const response = await api.put(`api/v1/users/${userId}/accountParams`, { phoneNumber, src });
        console.log(response.data);
        return handleApiResponseData(response, 'Updated user img Successfully', 'Updated user img failed');
    } catch (error) {
        handleApiError(error);
    }
};

export const handleDeleteUser = async (userId) => {
    try {
        setAuthToken()
        const response = await api.delete(`api/v1/users/${userId}`, {});
        console.log(response.data)
        return handleApiResponseData(response, 'Delete user data Successfully', 'Delete user data failed');
    } catch (error) {
        handleApiError(error);
    }
}


