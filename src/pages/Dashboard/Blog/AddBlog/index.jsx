import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import { useAddBlog } from "../../../../Hooks/useBlog";
import { useGetCategory } from "../../../../Hooks/useBlogCategory";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";

const CreateBlogForm = ({ handleCancel }) => {
  const addBlog = useAddBlog();
  const { categoryData, loading: categoryLoading } = useGetCategory();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);


  const categoryOptions = useMemo(() => {
    if (categoryLoading) return [{ value: "", label: "Loading categories..." }];
    if (!categoryData?.length) return [{ value: "", label: "No categories found" }];
    return categoryData.map((cat) => ({ value: cat.id, label: cat.name }));
  }, [categoryData, categoryLoading]);


  const statusOptions = useMemo(
    () => [
      { value: 1, label: "Active" },
      { value: 0, label: "Inactive" },
    ],
    []
  );

  const initialFormValues = useMemo(
    () => ({
      title: "",
      category_id: "",
      content: "",
      status: 1,
      image: "",
    }),
    []
  );

  const fields = useMemo(
    () => [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category_id", label: "Category", type: "text", select: true, options: categoryOptions, required: true },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "status", label: "Status", type: "text", select: true, options: statusOptions, required: true },
      { name: "image", label: "Image", type: "file", required: false },
    ],
    [categoryOptions, statusOptions]
  );


  const handleSubmit = (data) => {
  const finalData = { 
    ...data, 
    status: String(data.status)  
  };

    if (!finalData.title || !finalData.category_id || !finalData.content || finalData.status === undefined) {
      CustomErrorToast("All required fields must be filled.");
      return;
    }

    if (!passwordVerified) {
      setPendingFormData(finalData);
      setShowPasswordModal(true);
      return;
    }


    submitBlog(finalData);
  };


  const submitBlog = async (blogData) => {
    const result = await addBlog(blogData, activityPin);
    if (result?.error === 0) {
      CustomSuccessToast("Blog created successfully!");
      handleCancel();
      setActivityPin("");
      setPasswordVerified(true);
      setPendingFormData(null);
      setShowPasswordModal(false);
    } else {
      CustomErrorToast(result?.message || "Failed to add blog");
    }
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingFormData) return;

    setPasswordLoading(true);
    await submitBlog(pendingFormData);
    setPasswordLoading(false);
  };


  const handlePasswordModalClose = () => {
    setPendingFormData(null);
    setShowPasswordModal(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="ADD BLOG"
        description="Fill the details to add a new blog."
        textFields={fields}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
      />

      <PasswordModal
        open={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        password={activityPin}
        setPassword={setActivityPin}
        loading={passwordLoading}
        error={null}
      />
    </Box>
  );
};

export default CreateBlogForm;
