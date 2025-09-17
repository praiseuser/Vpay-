import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
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
    <Box sx={{ width: '100%', p: 2, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
      <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#1E3A8A', mb: 2 }}>
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
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextInputField
            label="Country Name"
            value={safeFormData.country_name}
            onChange={(e) => handleTextChange('country_name', e.target.value)}
            required
            size="small"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextInputField
            label="Country Code"
            value={safeFormData.country_code}
            onChange={(e) => handleTextChange('country_code', e.target.value)}
            required
            size="small"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextInputField
            label="Dial Code"
            value={safeFormData.country_dial_code}
            onChange={(e) => handleTextChange('country_dial_code', e.target.value)}
            required
            size="small"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatusField
            value={safeFormData.status}
            onChange={handleStatusChange}
            statusOptions={statusOptions}
            required
            size="small"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12}>
          <ImageUploadField
            onImageUpload={handleImageUpload}
            imageSrc={safeFormData.country_flag}
            sx={{ width: '100%' }}
          />
        </Grid>
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
};

export default CountryFormFields;