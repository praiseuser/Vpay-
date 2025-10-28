import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { API_BASE_URL } from '../config/path';
import { useAuth } from '../context/AuthContext';
import CustomErrorToast from '../components/CustomErrorToast';
import updateConfig from '../utilities/updateConfig';

export const useAddProviderCategory = () => {
    const { config } = useAuth()

    return async (formData, activityPin) => {
        const updatedConfig = updateConfig(config, activityPin)
        try {
            const response = await axios.post(
                `${API_BASE_URL}/admin/provider-category/create`,
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
export const useGetProviderCategory = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { config } = useAuth();

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/provider-categories`, config);
            const data = response.data;

            console.log("Fetched Categories Response:", data);

            if ((data?.success || data?.code === 0) && Array.isArray(data?.result)) {
                setCategoryData(data.result);
            } else {
                setCategoryData([]);
                CustomErrorToast(data?.message || "Failed to fetch provider categories!");
            }
        } catch (error) {
            console.error("Fetch Categories Error:", error);
            CustomErrorToast(error?.response?.data?.message || "Something went wrong while fetching provider categories!");
            setCategoryData([]);
        } finally {
            setLoading(false);
        }
    }, [config]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categoryData, loading, refetch: fetchCategories };
};