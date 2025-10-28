import React, { useState } from "react";
import AddForm from "../../../../components/AddForm";
import { useAddCountry } from "../../../../Hooks/useCountryCurrency";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import PasswordModal from "../../Card/PasswordModal";

const AddCountryForm = () => {
  const {
    addCountry,
    fiatCurrencies,
    loading,
    error,
    showPasswordModal,
    setShowPasswordModal,
  } = useAddCountry();

  const [formData, setFormData] = useState({
    currency_id: "",
    country_name: "",
    country_code: "",
    country_dial_code: "",
    country_flag: null,
    status: "1",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, country_flag: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Open modal before submitting
  const handleSubmit = () => {
    setShowPasswordModal(true);
  };

  // Submit with activity pin
  const handlePasswordSubmit = async () => {
    setPasswordLoading(true);

    try {
      const selectedCurrency = fiatCurrencies.find(
        (c) => c.currency_id === formData.currency_id
      );

      const formDataToSend = new FormData();
      formDataToSend.append("currency_id", formData.currency_id);
      formDataToSend.append("currency_name", selectedCurrency?.currency_name || "");
      formDataToSend.append("currency_code", selectedCurrency?.fiat_currency_code || "");
      formDataToSend.append("country_code", formData.country_code);
      formDataToSend.append("country_name", formData.country_name);
      formDataToSend.append("country_dial_code", formData.country_dial_code);
      formDataToSend.append("status", formData.status);
      if (formData.country_flag) {
        formDataToSend.append("country_flag", formData.country_flag);
      }

      const success = await addCountry(formDataToSend, activityPin);

      if (success) {
        CustomSuccessToast("✅ Country added successfully!");
        setFormData({
          currency_id: "",
          country_name: "",
          country_code: "",
          country_dial_code: "",
          country_flag: null,
          status: "1",
        });
        setImagePreview("");
        setActivityPin("");
      } else {
        CustomErrorToast("❌ Failed to add country");
      }
    } catch {
      CustomErrorToast("An error occurred while adding country");
    } finally {
      setPasswordLoading(false);
      setShowPasswordModal(false);
    }
  };

  return (
    <>
      <AddForm
        title="Add New Country"
        description="Enter the country details below to add a new record."
        onSubmit={handleSubmit}
        loading={loading}
        textFields={[
          {
            label: "Select Currency",
            name: "currency_id",
            value: formData.currency_id,
            onChange: (e) => handleChange("currency_id", e.target.value),
            select: true,
            options: fiatCurrencies.map((c) => ({
              label: c.fiat_currency_code,
              value: c.currency_id,
            })),
            required: true,
          },
          {
            label: "Country Name",
            name: "country_name",
            value: formData.country_name,
            onChange: (e) => handleChange("country_name", e.target.value),
            required: true,
          },
          {
            label: "Country Code",
            name: "country_code",
            value: formData.country_code,
            onChange: (e) => handleChange("country_code", e.target.value),
            required: true,
          },
          {
            label: "Dial Code",
            name: "country_dial_code",
            value: formData.country_dial_code,
            onChange: (e) => handleChange("country_dial_code", e.target.value),
            required: true,
          },
          {
            label: "Status",
            name: "status",
            value: formData.status,
            onChange: (e) => handleChange("status", e.target.value),
            select: true,
            options: [
              { label: "Active", value: "1" },
              { label: "Inactive", value: "0" },
            ],
            required: true,
          },
          {
            label: "Country Flag",
            name: "country_flag",
            type: "file",
            onChange: handleImageChange,
            preview: imagePreview,
          },
        ]}
      />

      {/* 🔐 Activity PIN Modal */}
      <PasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
        password={activityPin}
        setPassword={setActivityPin}
        loading={passwordLoading || loading}
        error={error}
      />
    </>
  );
};

export default AddCountryForm;
