import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/path";
import { useAuth } from "../context/AuthContext";
import updateConfig from "../utilities/updateConfig";
import CustomErrorToast from "../components/CustomErrorToast";
import CustomSuccessToast from "../components/CustomSuccessToast";

const useGetCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config } = useAuth();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/blog/categories`,
        config
      );

      const data = response.data;
      console.log("Fetched Categories Response:", data);

      if ((data?.success || data?.code === 0) && Array.isArray(data?.result)) {
        setCategoryData(data.result);
      } else {
        setCategoryData([]);
        CustomErrorToast(data?.message || "Failed to fetch categories!");
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
      CustomErrorToast("Something went wrong while fetching categories!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categoryData, loading, fetchCategories };
};
const useAddCategory = () => {
  const { config } = useAuth();

  return async (categoryData, activityPin) => {
    try {
      const updatedConfig = updateConfig(config, activityPin);
      const response = await axios.post(
        `${API_BASE_URL}/admin/blog/category/create`,
        categoryData,
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
    }
  };
};
const useUpdateCategory = () => {
  const { config } = useAuth();

  return async (id, categoryData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin)
    try {


      const response = await axios.put(
        `${API_BASE_URL}/admin/blog/category/update/${id}`,
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

export { useGetCategory, useAddCategory, useUpdateCategory, };