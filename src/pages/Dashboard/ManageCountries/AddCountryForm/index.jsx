import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useAddCountry } from "../../../../Hooks/useCountryCurrency";
import { toast } from "react-toastify";
import CountryFormFields from "../AddCountryForm/CountryFormFields";
import FormActions from "../AddCountryForm/FormActions";
import {
  formContainerStyle,
  titleStyle,
  errorStyle,
} from "../AddCountryForm/countryFormStyles";

const statusOptions = [
  { label: "ACTIVE", value: "1" },
  { label: "INACTIVE", value: "0" },
];


const getBase64extension = (base64String) => {
  if (!base64String) return null;
  const match = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (match && match[1]) {
    const mimeType = match[1].toLowerCase();
    return mimeType.split('/')[1]; 
  }
  return null;
};

const AddCountryForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    currency_id: "",
    country_name: "",
    country_code: "",
    country_dial_code: "",
    country_flag: "",
    status: "1",
  });

  const [accountPassword, setAccountPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const {
    addCountry,
    fiatCurrencies,
    loading,
    error,
    success,
    showPasswordModal,
    setShowPasswordModal,
    passwordVerified,
    resetState,
  } = useAddCountry();


  useEffect(() => {
    const selectedCurrency = fiatCurrencies.find(
      (c) => String(c.currency_id) === String(formData.currency_id)
    );
    if (selectedCurrency) {
      setFormData((prev) => ({
        ...prev,
        status:
          selectedCurrency.status === "1" || selectedCurrency.status === 1
            ? "1"
            : "0",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        country_name: "",
        country_code: "",
        country_dial_code: "",
        status: "1",
      }));
    }
  }, [formData.currency_id, fiatCurrencies]);

  // Handlers
  const handleCurrencyChange = (currencyId) => {
    setFormData((prev) => ({ ...prev, currency_id: currencyId }));
  };

  const handleTextChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      const extension = getBase64extension(base64String);
      if (extension && ["jpg", "jpeg", "png"].includes(extension)) {
        setFormData((prev) => ({ ...prev, country_flag: base64String }));
      } else {
        toast.error("Please upload a valid image file (jpg, jpeg, or png)");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, status }));
  };

  const handlePasswordSubmit = async () => {
    if (!accountPassword.trim()) return;

    setPasswordLoading(true);
    const success = await addCountry(formData, accountPassword);
    setPasswordLoading(false);

    if (success) {
      setAccountPassword("");
      onCancel();
    }
  };

  const handlePasswordModalClose = () => {
    resetState();
    onCancel();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currency_id) {
      toast.error("Please select a valid currency");
      return;
    }
    if (!formData.country_flag || !formData.country_flag.startsWith("data:image/")) {
      toast.error("Please upload a valid flag image");
      return;
    }

    if (passwordVerified) {
      const success = await addCountry(formData, accountPassword);
      if (success) {
        onCancel();
      }
    } else {
      setShowPasswordModal(true); 
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formContainerStyle}>
      <Typography variant="h6" sx={titleStyle}>
        Add New Country
      </Typography>

      <CountryFormFields
        formData={formData}
        handleCurrencyChange={handleCurrencyChange}
        handleTextChange={handleTextChange}
        handleImageUpload={handleImageUpload}
        handleStatusChange={handleStatusChange}
        fiatCurrencies={fiatCurrencies}
        statusOptions={statusOptions}
        loading={loading}
      />

      {error && <Typography sx={errorStyle}>{error}</Typography>}

      <FormActions
        onCancel={onCancel}
        loading={loading}
        showPasswordModal={showPasswordModal}
        setShowPasswordModal={setShowPasswordModal}
        handlePasswordSubmit={handlePasswordSubmit}
        handlePasswordModalClose={handlePasswordModalClose}
        accountPassword={accountPassword}
        setAccountPassword={setAccountPassword}
        passwordLoading={passwordLoading}
        error={error}
      />
    </Box>
  );
};

AddCountryForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default AddCountryForm;