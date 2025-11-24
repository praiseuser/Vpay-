import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useUpdateTransactionLimit } from "../../../../Hooks/useTransactionLimit";
import { useFetchFiatCurrencies } from "../../../../Hooks/useFiatCurrency";

const EditTransactionLimitForm = ({ limitData, handleCancel, onSuccess }) => {
  const updateTransactionLimit = useUpdateTransactionLimit();
  const { fiatCurrencies, loading: fiatLoading } = useFetchFiatCurrencies();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const initialFormValues = useMemo(
    () => ({
      account_tier: limitData.account_tier || "",
      transaction_type: limitData.transaction_type || "",
      fiat_id: limitData.fiat_id || "",
      single_transaction_limit: limitData.single_transaction_limit || "",
      daily_limit: limitData.daily_limit || "",
      weekly_limit: limitData.weekly_limit || "",
      monthly_limit: limitData.monthly_limit || "",
      status: limitData.status ? String(limitData.status) : "1",
    }),
    [limitData]
  );

  const fields = useMemo(
    () => [
      { name: "account_tier", label: "Account Tier", type: "text", required: true },
      { name: "transaction_type", label: "Transaction Type", type: "text", required: true },
      {
        name: "fiat_id",
        label: "Fiat Currency",
        select: true,
        required: true,
        options:
          fiatCurrencies?.map((item) => ({
            label: `${item.fiat_currency_name} (${item.fiat_currency_code})`,
            value: item.id,
          })) || [],
        loading: fiatLoading,
      },
      { name: "single_transaction_limit", label: "Single Transaction Limit", type: "number", required: true },
      { name: "daily_limit", label: "Daily Limit", type: "number", required: true },
      { name: "weekly_limit", label: "Weekly Limit", type: "number", required: true },
      { name: "monthly_limit", label: "Monthly Limit", type: "number", required: true },
      {
        name: "status",
        label: "Status",
        select: true,
        required: true,
        options: [
          { label: "Active", value: "1" },
          { label: "Inactive", value: "0" },
        ],
      },
    ],
    [fiatCurrencies, fiatLoading]
  );

  const handleSubmit = (data) => {
    if (
      !data.account_tier ||
      !data.transaction_type ||
      !data.single_transaction_limit ||
      !data.daily_limit ||
      !data.weekly_limit ||
      !data.monthly_limit ||
      !data.fiat_id
    ) {
      CustomErrorToast("All required fields must be filled.");
      return;
    }

    setPendingFormData(data);
    setShowPasswordModal(true);
  };

  const submitTransactionLimit = async (formData) => {
    const payload = {
      account_tier: formData.account_tier,
      transaction_type: formData.transaction_type,
      fiat_id: Number(formData.fiat_id),
      single_transaction_limit: formData.single_transaction_limit,
      daily_limit: formData.daily_limit,
      weekly_limit: formData.weekly_limit,
      monthly_limit: formData.monthly_limit,
      status: formData.status,
    };

    try {
      const result = await updateTransactionLimit(limitData.id, payload, activityPin);
      if (result?.success || result?.code === 0 || result?.error === 0) {
        CustomSuccessToast(result?.message || "Transaction Limit updated!");
        handleCancel();
        onSuccess?.();
      } else {
        CustomErrorToast(result?.message || "Failed to update transaction limit!");
      }
    } catch (error) {
      console.error(error);
      CustomErrorToast("An error occurred!");
    } finally {
      setActivityPin("");
      setShowPasswordModal(false);
      setPasswordLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingFormData) return;
    setPasswordLoading(true);
    await submitTransactionLimit(pendingFormData);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="EDIT TRANSACTION LIMIT"
        description="Update the transaction limit below."
        textFields={fields}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitText="Update Limit"
      />

      <PasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
        password={activityPin}
        setPassword={setActivityPin}
        loading={passwordLoading}
        error={null}
      />
    </Box>
  );
};

export default EditTransactionLimitForm;
