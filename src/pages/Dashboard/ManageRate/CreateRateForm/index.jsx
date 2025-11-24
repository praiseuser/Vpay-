import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useCreateRate } from "../../../../Hooks/useRateCurrency";
import { useFetchFiatCurrencies } from "../../../../Hooks/useFiatCurrency";

const CreateRateForm = ({ handleCancel }) => {
  const { fiatCurrencies, loading: currenciesLoading } =
    useFetchFiatCurrencies();
  const createRate = useCreateRate();

  const [activityPin, setActivityPin] = useState("");
  const [pendingData, setPendingData] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fields = useMemo(
    () => [
      {
        name: "currency_id",
        label: "Currency",
        type: "select",
        required: true,
        select: true,
        options: currenciesLoading
          ? [{ value: "", label: "Loading..." }]
          : fiatCurrencies?.map((c) => ({
              value: c.id,
              label: `${c.fiat_currency_name} (${c.fiat_currency_code})`,
            })) || [{ value: "", label: "No currencies found" }],
      },
      {
        name: "rate",
        label: "Rate",
        type: "number",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        select: true,
        options: [
          { value: 1, label: "Active" },
          { value: 0, label: "Inactive" },
        ],
      },
    ],
    [fiatCurrencies, currenciesLoading]
  );

  const handleSubmit = (data) => {
    const formattedData = {
      currency_id: Number(data.currency_id),
      rate: Number(data.rate),
      status: Number(data.status),
    };

    if (
      !formattedData.currency_id ||
      !formattedData.rate ||
      (formattedData.status !== 0 && formattedData.status !== 1)
    ) {
      CustomErrorToast("All fields are required");
      return;
    }

    setPendingData(formattedData);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingData) return;

    setPasswordLoading(true);
    const result = await createRate(pendingData, activityPin);
    setPasswordLoading(false);

    if (result?.error === 0 || result?.success) {
      CustomSuccessToast("Rate created successfully!");
      setShowPasswordModal(false);
      handleCancel();
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setActivityPin("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="ADD RATE"
        description="Create a new rate for a fiat currency."
        textFields={fields}
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
      />
    </Box>
  );
};

export default CreateRateForm;
