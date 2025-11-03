import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { API_BASE_URL } from '../config/path';
import { useAuth } from '../context/AuthContext';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';
import updateConfig from '../utilities/updateConfig';

export const useAddProvider = () => {
    const { config } = useAuth()

    return async (formData, activityPin) => {
        const updatedConfig = updateConfig(config, activityPin)
        try {
            const response = await axios.post(
                `${API_BASE_URL}/admin/service-provider/create`,
                formData,
                updatedConfig
            )

            CustomErrorToast(response.data.message)
            console.log("Response:", response.data)
            return response.data
        } catch (error) {
            console.error("Error:", error.response?.data || error.message)
        }
    }
};
export const useGetProviders = () => {
    const [providersData, setProvidersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { config } = useAuth();

    const fetchProviders = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/service-providers`, config);
            const data = response.data;

            console.log("Fetched Providers Response:", data);

            if ((data?.success || data?.code === 0) && Array.isArray(data?.result)) {
                setProvidersData(data.result);
            } else {
                setProvidersData([]);
                CustomErrorToast(data?.message || "Failed to fetch Providers!");
            }
        } catch (error) {
            console.error("Fetch Providers Error:", error);
            CustomErrorToast(
                error?.response?.data?.message ||
                "Something went wrong while fetching Providers!"
            );
            setProvidersData([]);
        } finally {
            setLoading(false);
        }
    }, [config]);

    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);

    return { providersData, loading, refetch: fetchProviders };
};
export const useDeleteProviders = () => {
    const { config } = useAuth();

    return async (id, activityPin) => {
        const updatedConfig = updateConfig(config, activityPin);
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/admin/service-provider/delete/${id}`,
                updatedConfig
            );

            CustomSuccessToast(response.data.message || "Provider deleted successfully!");
            console.log("Delete Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            CustomErrorToast(
                error?.response?.data?.message ||
                "An error occurred while deleting the provider!"
            );
        }
    };
};
export const useUpdateProviders = () => {
    const { config } = useAuth();

    return async (id, categoryData, activityPin) => {
        const updatedConfig = updateConfig(config, activityPin)
        try {

            const response = await axios.put(
                `${API_BASE_URL}/admin/service-provider/update/${id}`,
                categoryData,
                updatedConfig,
            );
            CustomSuccessToast(response.data.message);
            console.log("Respone:", response.data)
            return response.data;
        } catch (error) {
            console.error("Error:", error)
            if (error?.response?.data?.error) {
                CustomErrorToast(error.response.data.message)
            } else {
                CustomErrorToast("An error Occured while updating provider")
            }
        }
    };
};