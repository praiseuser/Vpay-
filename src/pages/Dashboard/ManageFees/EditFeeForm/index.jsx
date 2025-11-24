import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useUpdateFees } from "../../../../Hooks/useFeeCurrency";

const EditFeeForm = ({ feeData, handleCancel, onSuccess }) => {
  const { updateFee, loading: feeLoading } = useUpdateFees();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const [formData, setFormData] = useState({
    fee_name: feeData.fee_name || "",
    fee_type: feeData.fee_type || "",
    fee_amount: feeData.fee_amount || "",
    status: feeData.status ?? true,
    has_max_limit: feeData.has_max_limit ?? false,
    max_limit: feeData.max_limit || "",
  });

  const feeTypeOptions = [
    { value: "percentage", label: "Percentage" },
    { value: "fixed", label: "Fixed" },
  ];

  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];

  const hasMaxLimitOptions = [
    { value: true, label: "True" },
    { value: false, label: "False" },
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (data) => {
    if (!data.fee_name || !data.fee_type || !data.fee_amount) {
      CustomErrorToast("Please fill in all required fields.");
      return;
    }
    setPendingFormData(data);
    setShowPasswordModal(true);
  };

  const submitFee = async (data) => {
    const payload = {
      fee_name: data.fee_name,
      fee_type: data.fee_type,
      fee_amount: data.fee_amount,
      status: !!data.status,
      has_max_limit: data.has_max_limit,
      max_limit: data.has_max_limit ? data.max_limit : null,
    };

    const success = await updateFee(feeData.id, payload, activityPin);
    if (success) {
      CustomSuccessToast("Fee updated successfully!");
      handleCancel();
      onSuccess?.();
    }
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim()) {
      CustomErrorToast("Please enter your PIN");
      return;
    }
    setPasswordLoading(true);
    await submitFee(pendingFormData);
    setPasswordLoading(false);
    setShowPasswordModal(false);
    setActivityPin("");
    setPendingFormData(null);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPendingFormData(null);
  };

  const fields = useMemo(() => {
    const baseFields = [
      { name: "fee_name", label: "Fee Name", type: "text", required: true },
      { name: "fee_type", label: "Fee Type", type: "text", select: true, options: feeTypeOptions, required: true },
      { name: "fee_amount", label: "Fee Amount", type: "number", required: true },
      { name: "status", label: "Status", type: "text", select: true, options: statusOptions, required: true },
      { name: "has_max_limit", label: "Has Max Limit", type: "text", select: true, options: hasMaxLimitOptions },
    ];

    if (formData.has_max_limit === true || formData.has_max_limit === "true") {
      baseFields.push({ name: "max_limit", label: "Max Limit", type: "number", required: true });
    }

    return baseFields;
  }, [formData.has_max_limit]);

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="Edit Fee"
        description="Update fee details below."
        textFields={fields}
        initialValues={formData}
        onSubmit={handleSubmit}
        onChange={handleChange}
        submitText="Update Fee"
      />

      <PasswordModal
        open={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        password={activityPin}
        setPassword={setActivityPin}
        loading={passwordLoading || feeLoading}
        error={null}
      />
    </Box>
  );
};

export default EditFeeForm;
