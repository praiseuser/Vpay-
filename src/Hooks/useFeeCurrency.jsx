import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';
import { useAuth } from '../context/AuthContext';
import updateConfig from '../utilities/updateConfig';

const useAddFee = () => {
  const [loading, setLoading] = useState(false);
  const { config } = useAuth();

  const addFee = async (fees, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/transaction-fee/create`,
        fees,
        updatedConfig
      );

      const data = response.data;
      console.log("Add Fee Response:", data);

      if (data && data.success) {
        CustomSuccessToast(data.message);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error:", error);
      if (error?.response?.data?.error) {
        CustomErrorToast(error.response.data.message);
      } else {
        CustomErrorToast("An error occurred!");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addFee, loading };
};
const useGetFees = () => {
  const [feesData, setfeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/transaction-fees`,
        config
      );
      console.log("Full API Response:", response.data);

      if (response.data.success && response.data.code === 0) {
        setfeesData(response.data.result);
      } else {
        setfeesData([]);
      }
    } catch (error) {
      console.error("Error fetching fees:", error);
      setfeesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { feesData, loading, refetch: fetchData };
};
const useUpdateFees = () => {
  const [loading, setLoading] = useState(false);
  const { config } = useAuth();

  const updateFee = async (id, feeData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin)
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/transaction-fee/update/${id}`,
        feeData,
        updatedConfig
      );
      const data = response.data;
      console.log("Update Fee Response:", data);

      if (data && data.success) {
        CustomSuccessToast(data.message);
        return true;
      } else {
        CustomErrorToast(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error?.response?.data?.error) {
        CustomErrorToast(error.response.data.message);
      } else {
        CustomErrorToast("An error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateFee, loading };
};
const useDeleteFee = () => {
  const { config } = useAuth();

  return async (id, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin)
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/transaction-fee/delete/${id}`,
        {},
        updatedConfig
      );

      console.log("Delete Fee Response:", response.data);
      CustomSuccessToast(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error?.response?.data?.error) {
        CustomErrorToast(error.response.data.message);
      } else {
        CustomErrorToast("An error occurred while deleting Status!");
      }
    }
  };
}

export { useAddFee, useGetFees, useUpdateFees, useDeleteFee };