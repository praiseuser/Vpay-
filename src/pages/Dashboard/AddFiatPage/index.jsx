import React, { useState } from "react";
import AddForm from "../../../components/AddForm";
import PasswordModal from "../Card/PasswordModal";
import { useCreateFiatCurrency } from "../../../Hooks/useFiatCurrency";
import CustomErrorToast from "../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../components/CustomSuccessToast";

const AddFiatPage = () => {
  const [currency, setCurrency] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activityPin, setActivityPin] = useState("");

  const createFiatCurrency = useCreateFiatCurrency();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currency || !currencyCode || !countryCode) {
      CustomErrorToast("Please fill in all required fields.");
      return;
    }

    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    setLoading(true);
    try {
      const formData = {
        fiat_currency_name: currency,
        fiat_currency_code: currencyCode,
        country_code: countryCode,
        status: "1",
      };

      const response = await createFiatCurrency(formData, activityPin);

      if (response) {
        CustomSuccessToast("Fiat currency added successfully!");
        setShowPasswordModal(false);
        setCurrency("");
        setCurrencyCode("");
        setCountryCode("");
        setActivityPin("");
      }
    } catch (error) {
      console.error("Error adding fiat:", error);
      CustomErrorToast("Something went wrong while adding fiat.");
    } finally {
      setLoading(false);
    }
  };

  const textFields = [
    {
      label: "Currency Name",
      name: "fiat_currency_name",
      value: currency,
      onChange: (e) => setCurrency(e.target.value),
      placeholder: "Enter currency name (e.g., US Dollar)",
      required: true,
    },
    {
      label: "Currency Code",
      name: "fiat_currency_code",
      value: currencyCode,
      onChange: (e) => setCurrencyCode(e.target.value),
      placeholder: "Enter currency code (e.g., USD)",
      required: true,
    },
    {
      label: "Country Code",
      name: "country_code",
      value: countryCode,
      onChange: (e) => setCountryCode(e.target.value),
      placeholder: "Enter country code (e.g., US)",
      required: true,
    },
  ];

  return (
    <>
      <AddForm
        title="Add Fiat Currency"
        description="Fill in the details below to add a new fiat currency."
        textFields={textFields}
        onSubmit={handleSubmit}
      />

      {showPasswordModal && (
        <PasswordModal
          open={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSubmit={handlePasswordSubmit}
          password={activityPin}
          setPassword={setActivityPin}
          loading={loading}
        />
      )}
    </>
  );
};

export default AddFiatPage;
