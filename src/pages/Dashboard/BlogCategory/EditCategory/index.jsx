import React, { useState } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useUpdateCategory } from "../../../../Hooks/useBlogCategory";

const EditCategory = ({ categoryData, onUpdateSuccess, onCancel }) => {
  const updateCategory = useUpdateCategory();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);

  const statusOptions = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
  ];

  const fields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    {
      name: "status",
      label: "Status",
      type: "text",
      select: true,
      options: statusOptions,
      required: true,
    },
  ];

  const initialFormValues = {
    name: categoryData.name || "",
    description: categoryData.description || "",
    status: categoryData.status ?? 1,
  };

  const handleSubmit = async (data) => {
    if (!data.name || !data.description || data.status === undefined) {
      CustomErrorToast("All required fields must be filled.");
      return;
    }

    const formattedData = {
      name: data.name,
      description: data.description,
      status: String(data.status),
    };

    if (passwordVerified) {
      const result = await updateCategory(categoryData.id, formattedData, activityPin);
      if (result?.error === 0) {
        CustomSuccessToast("Category updated successfully!");
        onUpdateSuccess();
      }
    } else {
      setPendingFormData(formattedData);
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingFormData) return;

    setPasswordLoading(true);
    const result = await updateCategory(categoryData.id, pendingFormData, activityPin);
    setPasswordLoading(false);

    if (result?.error === 0 || result?.code === 0) {
      CustomSuccessToast("Category updated successfully!");
      setActivityPin("");
      setPendingFormData({});
      setPasswordVerified(true);
      setShowPasswordModal(false);
      onUpdateSuccess();
    }
  };

  const handlePasswordModalClose = () => {
    setPendingFormData({});
    setShowPasswordModal(false);
    onCancel();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="EDIT CATEGORY"
        description="Update the details of this category below."
        textFields={fields}
        onSubmit={handleSubmit}
        initialValues={initialFormValues}
        submitText="Update"
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

export default EditCategory;
