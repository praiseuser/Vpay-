import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import { useAddContractToken } from "../../../../Hooks/useContract";

const CreateContractTokenForm = ({ handleCancel, onSuccess }) => {
  const addContract = useAddContractToken();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const initialFormValues = useMemo(
    () => ({
      tokenType: "",
      tokenContract: "",
      decimals: 18,
      baseGasEstimate: 0,
      gasMultiplier: 1,
      requiresApproval: false,
      network: "mainnet",
    }),
    []
  );

  const fields = useMemo(
    () => [
      { name: "tokenType", label: "Token Type", type: "text", required: true },
      {
        name: "tokenContract",
        label: "Token Contract Address",
        type: "text",
        required: true,
      },
      { name: "decimals", label: "Decimals", type: "number", required: true },
      {
        name: "baseGasEstimate",
        label: "Base Gas Estimate",
        type: "number",
        required: true,
      },
      {
        name: "gasMultiplier",
        label: "Gas Multiplier",
        type: "number",
        required: true,
      },
      {
        name: "requiresApproval",
        label: "Requires Approval?",
        select: true,
        required: true,
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ],
      },
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
    ],
    []
  );

  const handleSubmit = (data) => {
    const processedData = {
      ...data,
      requiresApproval:
        data.requiresApproval === true || data.requiresApproval === "true",
      decimals: Number(data.decimals),
      baseGasEstimate: Number(data.baseGasEstimate),
      gasMultiplier: Number(data.gasMultiplier),
    };

    if (
      !processedData.tokenType ||
      !processedData.tokenContract ||
      !processedData.network
    ) {
      CustomErrorToast("All required fields must be filled.");
      return;
    }

    setPendingFormData(processedData);
    setShowPasswordModal(true);
  };

  const submitCategory = async (contractData) => {
    try {
      const result = await addContract(contractData, activityPin); // ✅ using new hook
      if (result?.error === 0 || result?.code === 0) {
        handleCancel();
        onSuccess?.();
      }
    } catch (error) {
      console.error("Error adding contract:", error);
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
    await submitCategory(pendingFormData);
  };

  const handlePasswordModalClose = () => {
    setPendingFormData(null);
    setShowPasswordModal(false);
    setActivityPin("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="ADD CONTRACT"
        description="Fill the details to add a new contract token."
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

export default CreateContractTokenForm;
