import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useAddCategory } from "../../../../Hooks/useBlogCategory";

const CreateCategoryForm = ({ handleCancel, onSuccess }) => {
  const addCategory = useAddCategory();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);

  const statusOptions = useMemo(
    () => [
      { value: 1, label: "Active" },
      { value: 0, label: "Inactive" },
    ],
    []
  );

  const initialFormValues = useMemo(
    () => ({
      name: "",
      description: "",
      status: 1,
    }),
    []
  );


  const fields = useMemo(
    () => [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "status", label: "Status", type: "text", select: true, options: statusOptions, required: true },
    ],
    [statusOptions]
  );


  const handleSubmit = (data) => {
    if (!data.name || !data.description || data.status === undefined) {
      CustomErrorToast("All required fields must be filled.");
      return;
    }

    const finalData = {
      ...data,
      status: String(data.status)
    };

    if (!passwordVerified) {
      setPendingFormData(data);
      setShowPasswordModal(true);
      return;
    }


    submitCategory(data);
  };


  const submitCategory = async (categoryData) => {
    const result = await addCategory(categoryData, activityPin);
    if (result?.error === 0) {
      CustomSuccessToast("Category created successfully!");
      handleCancel();
      onSuccess?.();
      setActivityPin("");
      setPasswordVerified(true);
      setPendingFormData(null);
      setShowPasswordModal(false);
    } else {
      CustomErrorToast(result?.message || "Failed to add category");
    }
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingFormData) return;

    setPasswordLoading(true);
    await submitCategory(pendingFormData);
    setPasswordLoading(false);
  };


  const handlePasswordModalClose = () => {
    setPendingFormData(null);
    setShowPasswordModal(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="ADD CATEGORY"
        description="Fill the details to add a new blog category."
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

export default CreateCategoryForm;
