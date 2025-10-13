import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import { useCreateRate } from "../../../../Hooks/useRateCurrency";

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

console.log("Currencies for rate creation:", currencies);
  const fields = [
    {
      name: "currency_id",
      label: "Currency",
      type: "select",
      required: true,
      options: currencies.map((c) => ({
        value: c.id,
        label: `${c.fiat_currency_name} (${c.fiat_currency_code})`, // clearer display
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
        { value: "1", label: "Enabled" },
        { value: "0", label: "Disabled" },
        { value: "null", label: "Null" },
      ],
    },
  ];


  const handleSubmit = async (formData) => {
    const { currency_id, rate, status } = formData;
    const statusValue = status === "null" ? null : status;

    if (!currency_id || !rate || !status) return;

    if (passwordVerified) {
      const result = await createRate(currency_id, rate, statusValue, accountPassword);
      if (result.success) handleCancel();
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
        title="Create Rate"
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Create"
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
