import React, { useState, useMemo, useCallback } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useFetchFiatCurrencies } from "../../../../Hooks/useFiatCurrency";
import { useUpdatRate } from "../../../../Hooks/useRateCurrency";

const EditRate = ({ rateData, onUpdateSuccess, onCancel }) => {
  const { fiatCurrencies, loading: currenciesLoading } =
    useFetchFiatCurrencies();
  const updateRate = useUpdatRate();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const initialValues = useMemo(
    () => ({
      currency_id: rateData?.currency_id || "",
      rate: rateData?.rate || "",
      status: rateData?.status !== undefined ? String(rateData.status) : "1",
    }),
    [rateData]
  );

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
          { value: "1", label: "Active" },
          { value: "0", label: "Inactive" },
        ],
      },
    ],
    [fiatCurrencies, currenciesLoading]
  );

  const handleSubmit = useCallback((data) => {
    const formattedData = {
      currency_id: String(data.currency_id).trim(),
      rate: String(data.rate).trim(),
      status: String(data.status).trim(),
    };

    if (
      !formattedData.currency_id ||
      !formattedData.rate ||
      (formattedData.status !== "0" && formattedData.status !== "1")
    ) {
      CustomErrorToast("All fields are required and valid");
      return;
    }

    setPendingData(formattedData);
    setShowPasswordModal(true);
  }, []);

  const handlePasswordSubmit = useCallback(async () => {
    if (!activityPin.trim() || !pendingData) return;

    setPasswordLoading(true);
    console.log("Sending update payload:", pendingData, "for ID:", rateData.id); // ← DEBUG LOG

    const result = await updateRate(rateData.id, pendingData, activityPin);
    setPasswordLoading(false);

    if (result?.error === 0 || result?.success) {
      CustomSuccessToast("Rate updated successfully!");
      setShowPasswordModal(false);
      setActivityPin("");
      setPendingData(null);
      onUpdateSuccess?.();
      onCancel?.();
    }
  }, [
    activityPin,
    pendingData,
    rateData.id,
    updateRate,
    onUpdateSuccess,
    onCancel,
  ]);

  const handlePasswordModalClose = useCallback(() => {
    setShowPasswordModal(false);
    setActivityPin("");
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="EDIT RATE"
        description="Update rate details below."
        textFields={fields}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        initialValues={initialValues}
        submitText="Update Rate"
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

export default EditRate;
