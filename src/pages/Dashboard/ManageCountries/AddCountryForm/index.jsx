import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { useAddCountry } from '../../../../Hooks/useCountryCurrency';

const statusOptions = ['active', 'inactive'];

const AddCountryForm = ({ onCancel, countries = [], currencyOptions = [] }) => {
  const [currencyId, setCurrencyId] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [countryFlag, setCountryFlag] = useState('');
  const [status, setStatus] = useState('active');

  const { addCountry, loading, error } = useAddCountry();


  useEffect(() => {
    const selectedCurrency = currencyOptions.find(
      (c) => String(c.Currency_Id) === String(currencyId)
    );
    if (selectedCurrency) {
      setCountryName(selectedCurrency.Country_name || '');
      setCountryCode(selectedCurrency.Country_code || '');
      setDialCode(selectedCurrency.Country_dial_code || '');
      setStatus(selectedCurrency.status || 'active');

    }
  }, [currencyId, currencyOptions]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCountryFlag(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currencyId) {
      alert('Please select a valid currency');
      return;
    }

    if (!countryFlag.startsWith('data:image/')) {
      alert('Please upload a valid flag image');
      return;
    }

    const newCountry = {
      currency_id: String(currencyId),
      country_name: countryName,
      country_code: countryCode,
      country_dial_code: dialCode,
      country_flag: countryFlag,
      status,
    };

    const result = await addCountry(newCountry);
    if (result?.success) {
      onCancel();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        mt: 4,
        p: 4,
        boxShadow: 3,
        borderRadius: 4,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Add New Country
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <Autocomplete
          options={currencyOptions}
          getOptionLabel={(option) =>
            `${option.Currency_Id} - ${option.Country_name}`
          }
          onChange={(event, newValue) => {
            setCurrencyId(newValue ? newValue.Currency_Id : '');
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Currency" required />
          )}
          value={
            currencyOptions.find(c => String(c.Currency_Id) === String(currencyId)) || null
          }
          isOptionEqualToValue={(option, value) =>
            String(option.Currency_Id) === String(value.Currency_Id)
          }
        />

        <TextField
          label="Country Name"
          fullWidth
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          required
        />

        <TextField
          label="Country Code"
          fullWidth
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
        />

        <TextField
          label="Dial Code"
          fullWidth
          value={dialCode}
          onChange={(e) => setDialCode(e.target.value)}
          required
        />

        <Button variant="outlined" component="label">
          Upload Flag Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>

        {countryFlag && (
          <Box>
            <Typography variant="body2" sx={{ mt: 1 }}>Preview:</Typography>
            <img
              src={countryFlag}
              alt="Country Flag"
              style={{ width: 80, height: 50, borderRadius: 4, marginTop: 5 }}
            />
          </Box>
        )}

        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography sx={{ cursor: 'pointer', color: 'red' }} onClick={onCancel}>
            Cancel
          </Typography>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            startIcon={loading ? <CircularProgress color="inherit" size={18} /> : null}
          >
            {loading ? 'Adding...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCountryForm;
