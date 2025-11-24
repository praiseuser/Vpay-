import React, { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import { useUpdateCountries } from "../../../../Hooks/useCountryCurrency";
import { useFetchFiatCurrencies } from "../../../../Hooks/useFiatCurrency";
import { BASE_IMAGE_URL } from "../../../../utilities/constants";

const EditCountry = ({ countryData, onUpdateSuccess, onCancel }) => {
  const { updateCountry } = useUpdateCountries();
  const { fiatCurrencies, loading: fiatLoading } = useFetchFiatCurrencies();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [flagPreview, setFlagPreview] = useState("");

  // ✅ Load existing country flag preview
  useEffect(() => {
    const flagPath = countryData?.Country_Flag || countryData?.country_flag;
    if (flagPath) {
      setFlagPreview(`${BASE_IMAGE_URL}${flagPath}`);
    }
  }, [countryData]);

  // ✅ Set initial form values
  const initialFormValues = useMemo(
    () => ({
      country_name: countryData?.Country_name || "",
      country_code: countryData?.Country_code || "",
      country_dial_code: countryData?.Country_dial_code || "",
      currency_id: countryData?.currency_id || "",
      country_flag: "", // start empty, handled by preview
      status: countryData?.status ? String(countryData.status) : "1",
    }),
    [countryData]
  );

  // ✅ Define form fields
  const fields = useMemo(
    () => [
      {
        name: "country_name",
        label: "Country Name",
        type: "text",
        required: true,
      },
      {
        name: "country_code",
        label: "Country Code",
        type: "text",
        required: true,
      },
      {
        name: "country_dial_code",
        label: "Dial Code",
        type: "text",
        required: true,
      },
      {
        name: "currency_id",
        label: "Currency",
        select: true,
        required: true,
        options:
          fiatCurrencies?.map((currency) => ({
            label: `${currency.fiat_currency_name} (${currency.fiat_currency_code})`,
            value: currency.id,
          })) || [],
        loading: fiatLoading,
      },
      {
        name: "country_flag",
        label: "Country Flag",
        type: "file",
        accept: "image/*",
        required: false,
        preview: flagPreview, // ✅ shows preview image
      },
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
    [fiatCurrencies, fiatLoading, flagPreview]
  );

  // ✅ Validate form before opening password modal
  const handleSubmit = (data) => {
    if (
      !data.country_name ||
      !data.country_code ||
      !data.country_dial_code ||
      !data.currency_id
    ) {
      CustomErrorToast("Please fill in all required fields.");
      return;
    }

    setPendingFormData(data);
    setShowPasswordModal(true);
  };

  // ✅ Submit updated data
  const submitCountry = async (formData) => {
    let finalFlag = formData.country_flag;

    // If user didn’t change the image, keep the old one
    if (
      !finalFlag ||
      (!finalFlag.startsWith("data:image") && !finalFlag.endsWith(".png") && !finalFlag.endsWith(".jpg"))
    ) {
      finalFlag = countryData?.Country_Flag || countryData?.country_flag;
    }

    const payload = {
      country_name: formData.country_name,
      country_code: formData.country_code,
      country_dial_code: formData.country_dial_code,
      currency_id: String(formData.currency_id),
      country_flag: finalFlag,
      status: String(formData.status),
    };

    try {
      const result = await updateCountry(countryData.id, payload, activityPin);
      if (result?.error === 0 || result?.code === 0 || result === true) {
        onUpdateSuccess?.();
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setActivityPin("");
      setShowPasswordModal(false);
      setPasswordLoading(false);
    }
  };

  // ✅ Handle password submit
  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingFormData) return;
    setPasswordLoading(true);
    await submitCountry(pendingFormData);
  };

  // ✅ Close password modal
  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPendingFormData(null);
    setActivityPin("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="EDIT COUNTRY"
        description="Update country details below."
        textFields={fields}
        onSubmit={handleSubmit}
        initialValues={initialFormValues}
        submitText="Update Country"
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

export default EditCountry;
