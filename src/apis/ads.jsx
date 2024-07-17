
import { api, handleApiError, handleApiResponseData, setAuthToken } from "./api";

export const handleGetAllAds = async () => {
    try {
        setAuthToken()
        const response = await api.get('api/v1/announcements/all-announcements', {});
        return handleApiResponseData(response, 'Get ads Successfully', 'Get ads failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const handleCreateNewAds = async (title, content, type, src) => {
    try {
        setAuthToken()
        const response = await api.post('api/v1/announcements/new-announcement', { title, content, type, src });
        return handleApiResponseData(response, 'add new  ads Successfully', 'add new ads failed');
    } catch (error) {
        handleApiError(error);
    }
};


export const hanldeDeleteAds = async (id) => {
    try {
        setAuthToken()
        const response = await api.delete(`api/v1/announcements/${id}`, { });
        return handleApiResponseData(response, 'delete ads Successfully', 'delete ads failed');
    } catch (error) {
        handleApiError(error);
    }
};
