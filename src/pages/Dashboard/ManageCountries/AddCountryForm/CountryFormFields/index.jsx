import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import CurrencyField from '../CountryFormFields/CurrencyField';
import TextInputField from '../CountryFormFields/TextInputField';
import ImageUploadField from '../CountryFormFields/ImageUploadField';
import StatusField from '../CountryFormFields/StatusField';

const CountryFormFields = ({
  formData,
  handleCurrencyChange,
  handleTextChange,
  handleImageUpload,
  handleStatusChange,
  fiatCurrencies,
  statusOptions,
  loading,
  onCancel,
  onSubmit,
  error,
}) => {
  const safeFormData = formData || {
    currency_id: '',
    country_name: '',
    country_code: '',
    country_dial_code: '',
    country_flag: '',
    status: '',
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Country
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CurrencyField
            value={safeFormData.currency_id}
            onChange={handleCurrencyChange}
            fiatCurrencies={fiatCurrencies}
            loading={loading}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextInputField
            label="Country Name"
            value={safeFormData.country_name}
            onChange={(e) => handleTextChange('country_name', e.target.value)}
            required
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextInputField
            label="Country Code"
            value={safeFormData.country_code}
            onChange={(e) => handleTextChange('country_code', e.target.value)}
            required
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextInputField
            label="Dial Code"
            value={safeFormData.country_dial_code}
            onChange={(e) => handleTextChange('country_dial_code', e.target.value)}
            required
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatusField
            value={safeFormData.status}
            onChange={handleStatusChange}
            statusOptions={statusOptions}
            required
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <ImageUploadField
            onImageUpload={handleImageUpload}
            imageSrc={safeFormData.country_flag}
          />
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
              {error}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

CountryFormFields.propTypes = {
  formData: PropTypes.shape({
    currency_id: PropTypes.string.isRequired,
    country_name: PropTypes.string.isRequired,
    country_code: PropTypes.string.isRequired,
    country_dial_code: PropTypes.string.isRequired,
    country_flag: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  handleCurrencyChange: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  fiatCurrencies: PropTypes.array.isRequired,
  statusOptions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default CountryFormFields;
