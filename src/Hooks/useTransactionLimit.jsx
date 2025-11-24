import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../config/path";
import { useAuth } from "../context/AuthContext";
import CustomErrorToast from "../components/CustomErrorToast";
import updateConfig from "../utilities/updateConfig";
import CustomSuccessToast from "../components/CustomSuccessToast";

export const useAddTransactionLimit = () => {
  const { config } = useAuth();

  return async (formData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/transaction-limit/create`,
        formData,
        updatedConfig
      );

      CustomErrorToast(response.data.message);
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
};
export const useUpdateTransactionLimit = () => {
  const { config } = useAuth();

  return async (id, categoryData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/transaction-limit/update/${id}`,
        categoryData,
        updatedConfig
      );
      CustomSuccessToast(response.data.message);
      console.log("Respone:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      if (error?.response?.data?.error) {
        CustomErrorToast(error.response.data.message);
      } else {
        CustomErrorToast("An error Occured while updating provider");
      }
    }
  };
};
export const useGetTransactionLimit = () => {
  const [transactionLimitData, setTransactionLimitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config } = useAuth();

  const fetchTransactionLimits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/transaction-limits`,
        config
      );

      const data = response.data;

      console.log("Fetched Transaction Limits Response:", data);

      if ((data?.success || data?.code === 0) && Array.isArray(data?.result)) {
        setTransactionLimitData(data.result);
      } else {
        setTransactionLimitData([]);
        CustomErrorToast(
          data?.message || "Failed to fetch Transaction Limits!"
        );
      }
    } catch (error) {
      console.error("Fetch Transaction Limits Error:", error);
      CustomErrorToast(
        error?.response?.data?.message ||
          "Something went wrong while fetching Transaction Limits!"
      );
      setTransactionLimitData([]);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchTransactionLimits();
  }, [fetchTransactionLimits]);

  return { transactionLimitData, loading, refetch: fetchTransactionLimits };
};
