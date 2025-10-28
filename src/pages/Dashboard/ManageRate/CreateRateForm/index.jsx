import React, { useState } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import { useCreateRate } from "../../../../Hooks/useRateCurrency";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";

const CreateRateForm = ({ handleCancel }) => {
  const {
    createRate,
    isCreating,
    error: hookError,
    currencies = [],
    passwordVerified,
    showPasswordModal,
    setShowPasswordModal,
    resetState,
  } = useCreateRate();

  const [accountPassword, setAccountPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const fields = [
    {
      name: "currency_id",
      label: "Currency",
      type: "select",
      required: true,
      options: currencies.map((c) => ({
        value: c.id,
        label: `${c.fiat_currency_name} (${c.fiat_currency_code})`,
      })),
    },
    {
      name: "rate",
      label: "Rate",
      type: "number",
      placeholder: "e.g., 50000",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "Active" },
        { value: "0", label: "Inactive" },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    const { currency_id, rate, status } = data;

    if (!currency_id || !rate || !status) {
      CustomErrorToast("All fields are required.");
      return;
    }

    const statusValue = status === "null" ? null : status;

    if (passwordVerified) {
      const result = await createRate(currency_id, rate, statusValue, accountPassword);
      if (result.success) {
        CustomSuccessToast("Rate created successfully!");
        handleCancel();
      }
    } else {
      setPendingFormData({ currency_id, rate, statusValue });
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!accountPassword.trim() || !pendingFormData) return;

    setPasswordLoading(true);
    const result = await createRate(
      pendingFormData.currency_id,
      pendingFormData.rate,
      pendingFormData.statusValue,
      accountPassword
    );
    setPasswordLoading(false);

    if (result.success) {
      CustomSuccessToast("Rate created successfully!");
      setAccountPassword("");
      setPendingFormData(null);
      handleCancel();
    }
  };

  const handlePasswordModalClose = () => {
    setPendingFormData(null);
    resetState();
    handleCancel();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="ADD RATE"
        description="Add a new fiat rate to the system."
        textFields={fields}
        onSubmit={handleSubmit}
      />

      <PasswordModal
        open={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        password={accountPassword}
        setPassword={setAccountPassword}
        loading={passwordLoading || isCreating}
        error={hookError}
      />
    </Box>
  );
};

export default CreateRateForm;
