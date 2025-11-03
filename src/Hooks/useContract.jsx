import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/path";
import { useAuth } from "../context/AuthContext";
import updateConfig from "../utilities/updateConfig";
import CustomErrorToast from "../components/CustomErrorToast";
import CustomSuccessToast from "../components/CustomSuccessToast";

export const useAddContract = () => {
  const { config } = useAuth();

  return async (contractData, activityPin) => {
    try {
      const updatedConfig = updateConfig(config, activityPin);
      const response = await axios.post(
        `${API_BASE_URL}/web3/fee/add`,
        contractData,
        updatedConfig
      );

      CustomSuccessToast(response.data.message);
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);

      if (error?.response?.data?.message) {
        CustomErrorToast(error.response.data.message);
      } else {
        CustomErrorToast("An unexpected error occurred!");
      }
      throw error;
    }
  };
};

export const useGetContract = () => {
  const [contractData, setContractData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config } = useAuth();

  const fetchContract = async () => {
    setLoading(true);
    try {
      const params = {
        tokenType: "ETH", 
        feeName: "Transfer",
        network: "testnet", 
      };

      const response = await axios.get(`${API_BASE_URL}/web3/fee/get`, {
        ...config,
        params,
      });

      const data = response.data;
      console.log("Fetched Contract Response:", data);

      if ((data?.success || data?.code === 0) && Array.isArray(data?.result)) {
        setContractData(data.result);
      } else {
        setContractData([]);
        CustomErrorToast(data?.message || "Failed to fetch contracts!");
      }
    } catch (error) {
      console.error("Fetch Contracts Error:", error);
      CustomErrorToast("Something went wrong while fetching contracts!");
      setContractData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContract();
  }, []);

  return { contractData, loading, fetchContract };
};