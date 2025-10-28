import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { API_BASE_URL } from '../config/path';
import { useAuth } from '../context/AuthContext';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast'
import updateConfig from '../utilities/updateConfig';

export const useAddFaq = () => {
    const { config } = useAuth()

    return async (formData, activityPin) => {
        const updatedConfig = updateConfig(config, activityPin)
        try {
            const response = await axios.post(
                `${API_BASE_URL}/admin/faq/create`,
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
export const useGetFaq = () => {
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { config } = useAuth();

    const fetchFaqs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/faqs`, config);
            const data = response.data;

            console.log("Fetched FAQs Response:", data);

            if ((data?.success || data?.code === 0) && Array.isArray(data?.result)) {
                setFaqData(data.result);
            } else {
                setFaqData([]);
                CustomErrorToast(data?.message || "Failed to fetch FAQs!");
            }
        } catch (error) {
            console.error("Fetch FAQs Error:", error);
            CustomErrorToast(
                error?.response?.data?.message ||
                "Something went wrong while fetching FAQs!"
            );
            setFaqData([]);
        } finally {
            setLoading(false);
        }
    }, [config]);

    useEffect(() => {
        fetchFaqs();
    }, [fetchFaqs]);

    return { faqData, loading, refetch: fetchFaqs };
};
export const useDeleteFaq = () => {
  const { config } = useAuth();

  return async (id, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/faq/delete/${id}`,
        updatedConfig
      );

      CustomSuccessToast(response.data.message || "Faq deleted successfully!");
      console.log("Delete Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      CustomErrorToast(
        error?.response?.data?.message ||
        "An error occurred while deleting the blog!"
      );
    }
  };
};
export const useUpdateFaq = () => {
  const { config } = useAuth();

  return async (id, categoryData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin)
    try {


      const response = await axios.put(
        `${API_BASE_URL}/admin/faq/update/${id}`,
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
        CustomErrorToast("An error Occured while updating category")
      }
    }
  };
};
export const useViewFaq = () => {  
  const { config } = useAuth();

  return async (id, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/faq/view/${id}`,
        updatedConfig
      );

      CustomSuccessToast(response.data.message || "Faq retrieved successfully!");
      console.log("View Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("View Error:", error.response?.data || error.message);
      CustomErrorToast(
        error?.response?.data?.message || "An error occurred while retrieving the faq!"
      );
    }
  };
};