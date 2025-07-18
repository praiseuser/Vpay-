import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useAddCountry } from '../../../../Hooks/useCountryCurrency';
import { toast } from 'react-toastify';
import CountryFormFields from '../AddCountryForm/CountryFormFields';
import FormActions from '../AddCountryForm/FormActions';
import { formContainerStyle, titleStyle, errorStyle } from '../AddCountryForm/countryFormStyles'


const statusOptions = [
  { label: 'ACTIVE', value: '1' },
  { label: 'INACTIVE', value: '0' },
];


const AddCountryForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    currency_id: '',
    country_name: '',
    country_code: '',
    country_dial_code: '',
    country_flag: '',
    status: '1',
  });

  const { addCountry, fiatCurrencies, loading, error, success } = useAddCountry();

  useEffect(() => {
    const selectedCurrency = fiatCurrencies.find(
      (c) => String(c.currency_id) === String(formData.currency_id)
    );
    if (selectedCurrency) {
      setFormData((prev) => ({
        ...prev,
        status: selectedCurrency.status === '1' || selectedCurrency.status === 1 ? '1' : '0',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        country_name: '',
        country_code: '',
        country_dial_code: '',
        status: '1',
      }));
    }
  }, [formData.currency_id, fiatCurrencies]);

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
      setFormData((prev) => ({ ...prev, country_flag: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currency_id) {
      toast.error('Please select a valid currency');
      return;
    }

    if (!formData.country_flag.startsWith('data:image/')) {
      toast.error('Please upload a valid flag image');
      return;
    }

    const newCountry = {
      currency_id: String(formData.currency_id),
      country_name: formData.country_name,
      country_code: formData.country_code,
      country_dial_code: formData.country_dial_code,
      country_flag: formData.country_flag,
      status: formData.status,
    };

    const result = await addCountry(newCountry);
    if (result?.success) {
      onCancel();
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

      {error && (
        <Typography sx={errorStyle}>
          {error}
        </Typography>
      )}

      <FormActions onCancel={onCancel} loading={loading} />
    </Box>
  );
};

AddCountryForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default AddCountryForm;