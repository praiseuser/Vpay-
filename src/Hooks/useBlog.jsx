import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { API_BASE_URL } from '../config/path';
import { useAuth } from '../context/AuthContext';
import CustomErrorToast from '../components/CustomErrorToast';
import updateConfig from '../utilities/updateConfig';
import CustomSuccessToast from '../components/CustomSuccessToast'


export const useGetBlogs = (currentPage) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const { config } = useAuth();

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/blogs/${currentPage}`, config);

      console.log("Fetched blogs:", response.data);

      if (response.data?.error === 0 || response.data?.code === 0) {
        const blogRows = response.data.result?.rows || [];
        setBlogs(blogRows);
        setPages(parseInt(response.data.result?.count) || 0);
      } else {
        CustomErrorToast(response.data?.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error(" Error fetching blogs:", error);
      CustomErrorToast("An error occurred while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return { blogs, loading, pages, refetch };
};
export const useAddBlog = () => {
  const { config } = useAuth()

  return async (blogData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/blog/create`,
        blogData,
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
export const useDeleteBlog = () => {
  const { config } = useAuth();

  return async (id, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/blog/delete/${id}`,
        updatedConfig
      );

      CustomSuccessToast(response.data.message || "Blog deleted successfully!");
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
export const useSearchBlog = () => {
  const { config } = useAuth();

  return async (query) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/search/blogs`,
        {
          ...config,
          params: { query },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Search Blog Error:", error?.response?.data || error.message);
      return null;
    }
  };
};
export const useViewBlog = () => {  
  const { config } = useAuth();

  return async (id, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/blog/view/${id}`,
        updatedConfig
      );

      CustomSuccessToast(response.data.message || "Blog retrieved successfully!");
      console.log("View Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("View Error:", error.response?.data || error.message);
      CustomErrorToast(
        error?.response?.data?.message || "An error occurred while retrieving the blog!"
      );
    }
  };
};
export default { useGetBlogs, useAddBlog, useDeleteBlog, useSearchBlog, useViewBlog }
