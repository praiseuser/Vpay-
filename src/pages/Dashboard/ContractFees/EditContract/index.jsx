import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import { useUpdateContract } from "../../../../Hooks/useContract";

const UpdateContractForm = ({ handleCancel, onSuccess, contract }) => {
  const updateContract = useUpdateContract();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);


  const initialFormValues = useMemo(
    () => ({
      tokenType: contract?.tokenType || "",
      feeType: contract?.feeType || "",
      feeName: contract?.feeName || "",
      feeAmount: contract?.feeAmount || "",
      network: contract?.network || "mainnet",
      hasMaxLimit: contract?.hasMaxLimit ?? false,
      maxLimit: contract?.maxLimit ?? 0,
      status: contract?.status ?? true,
    }),
    [contract]
  );

  const fields = useMemo(
    () => [
      { name: "tokenType", label: "Token Type", type: "text", required: true },
      { name: "feeType", label: "Fee Type", type: "text", required: true },
      { name: "feeName", label: "Fee Name", type: "text", required: true },
      { name: "feeAmount", label: "Fee Amount", type: "text", required: true },
      {
        name: "network",
        label: "Network",
        select: true,
        required: true,
        options: [
          { label: "Mainnet", value: "mainnet" },
          { label: "Testnet", value: "testnet" },
        ],
      },
      {
        name: "hasMaxLimit",
        label: "Has Max Limit?",
        select: true,
        required: true,
        options: [
          { label: "True", value: true },
          { label: "False", value: false },
        ],
      },
      {
        name: "maxLimit",
        label: "Max Limit",
        type: "number",
        required: false,
      },
      {
        name: "status",
        label: "Status",
        select: true,
        required: true,
        options: [
          { label: "Active (True)", value: true },
          { label: "Inactive (False)", value: false },
        ],
      },
    ],
    []
  );

  // 🔥 Handle submit → validate → open password modal
  const handleSubmit = (data) => {
    const processedData = {
      ...data,
      hasMaxLimit: data.hasMaxLimit === true || data.hasMaxLimit === "true",
      status: data.status === true || data.status === "true",
      maxLimit: Number(data.maxLimit),
      feeAmount: Number(data.feeAmount),
    };

    if (
      !processedData.tokenType ||
      !processedData.feeName ||
      !processedData.network
    ) {
      CustomErrorToast("All required fields must be filled.");
      return;
    }

    if (processedData.hasMaxLimit && processedData.maxLimit <= 0) {
      CustomErrorToast(
        "Max Limit must be greater than 0 when 'Has Max Limit' is true."
      );
      return;
    }

    setPendingFormData(processedData);
    setShowPasswordModal(true);
  };

  const submitUpdate = async (contractData) => {
    try {
      const result = await updateContract(contractData, activityPin);
      if (result?.error === 0 || result?.code === 0) {
        handleCancel();
        onSuccess?.();
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setActivityPin("");
      setPasswordLoading(false);
      setShowPasswordModal(false);
      setPendingFormData(null);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingFormData) return;
    setPasswordLoading(true);
    await submitUpdate(pendingFormData);
  };

  const handlePasswordModalClose = () => {
    setPendingFormData(null);
    setShowPasswordModal(false);
    setActivityPin("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="UPDATE CONTRACT"
        description="Modify the details below to update this contract fee."
        textFields={fields}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
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

export default UpdateContractForm;
