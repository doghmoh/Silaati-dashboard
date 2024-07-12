
import { api, handleApiError, handleApiResponseData, setAuthToken } from "./api";


export const handleStats = async () => {
    try {
        setAuthToken();
        const [orderStats, userRelatedStats, topProductsSold, retailersSpendStats] = await Promise.all([
            api.get('api/v1/stats/orderStats', {}),
            api.get('api/v1/stats/UserRelatedStats', {}),
            api.get(`api/v1/stats/getTopProductsSold?page=1&limit=6`, {}),
            api.get('api/v1/stats/RetailerSpendStats', {})
        ]);

        return {
            orderStats: handleApiResponseData(orderStats, 'Get Orders stats Successfully', 'Get Orders stats failed'),
            userRelatedStats: handleApiResponseData(userRelatedStats, 'Get User Related stats Successfully', 'Get User Related stats failed'),
            topProductsSold: handleApiResponseData(topProductsSold, 'Get Top Products Sold stats Successfully', 'Get Top Products Sold stats failed'),
            retailersSpendStats: handleApiResponseData(retailersSpendStats, 'Get Retailers Spend stats Successfully', 'Get Retailers Spend stats failed')
        };
    } catch (error) {
        handleApiError(error);
    }
};
