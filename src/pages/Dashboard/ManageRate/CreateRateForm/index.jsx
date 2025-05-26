import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Modal,
  CircularProgress,
  Select,
} from '@mui/material';
import { useCreateRate } from '../../../../Hooks/useRateCurrency';

const CreateRateForm = ({ handleCancel }) => {
  const {
    createRate,
    isCreating,
    error,
    currencies = [],
  } = useCreateRate();

  const [rate, setRate] = useState('');
  const [status, setStatus] = useState('1');
  const [selectedCurrencyId, setSelectedCurrencyId] = useState('');

  useEffect(() => {
    console.log('Current currencies in form:', currencies);
  }, [currencies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statusValue = status === 'null' ? null : status;

    const result = await createRate(selectedCurrencyId, rate, statusValue);
    if (result.success) {
      setRate('');
      setStatus('1');
      setSelectedCurrencyId('');
      handleCancel();
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currency_id') {
      setSelectedCurrencyId(value);
    } else if (name === 'rate') {
      setRate(value);
    } else if (name === 'status') {
      setStatus(value);
    }
  };

  return (
    <Modal
      open={true}
      onClose={handleCancel}
      aria-labelledby="create-rate-modal"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'white',
          borderRadius: '16px',
          p: 3,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          id="create-rate-modal"
          sx={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '20px',
            color: '#4A85F6',
            mb: 2,
          }}
        >
          Create Rate
        </Typography>

        {/* Currency Dropdown */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 600,
              fontSize: '14px',
              color: '#363853',
            }}
          >
            Currency
          </Typography>
          <Select
            name="currency_id" // Changed to lowercase
            value={selectedCurrencyId}
            onChange={handleFormChange}
            variant="outlined"
            fullWidth
            displayEmpty
            renderValue={(value) =>
              value
                ? currencies.find((c) => c.id === value)?.fiat_currency || 'Select a currency'
                : 'Select a currency'
            }
            sx={{
              backgroundColor: '#FAFAFA',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#FAFAFA',
                '& fieldset': {
                  borderColor: '#D9D9D9',
                  borderWidth: '1px',
                },
              },
              '& .MuiMenuItem-root': {
                color: '#000',
              },
            }}
          >
            {currencies.length > 0 ? (
              currencies.map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.fiat_currency}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No currencies available</MenuItem>
            )}
          </Select>
        </Box>

        {/* Rate Field */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 600,
              fontSize: '14px',
              color: '#363853',
            }}
          >
            Rate
          </Typography>
          <TextField
            name="rate" // Changed to lowercase
            type="number"
            value={rate}
            onChange={handleFormChange}
            variant="outlined"
            fullWidth
            placeholder="e.g., 50000"
            sx={{
              backgroundColor: '#FAFAFA',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#FAFAFA',
                '& fieldset': {
                  borderColor: '#D9D9D9',
                  borderWidth: '1px',
                },
              },
            }}
          />
        </Box>

        {/* Status Dropdown */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 600,
              fontSize: '14px',
              color: '#363853',
            }}
          >
            Status
          </Typography>
          <Select
            name="status" // Changed to lowercase
            value={status}
            onChange={handleFormChange}
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: '#FAFAFA',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#FAFAFA',
                '& fieldset': {
                  borderColor: '#D9D9D9',
                  borderWidth: '1px',
                },
              },
            }}
          >
            <MenuItem value="1">Enabled</MenuItem>
            <MenuItem value="0">Disabled</MenuItem>
            <MenuItem value="null">Null</MenuItem>
          </Select>
        </Box>

        {error && (
          <Typography color="error" sx={{ fontFamily: 'Inter', fontSize: '12px' }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'capitalize',
              color: '#73757C',
              cursor: 'pointer',
            }}
            onClick={handleCancel}
          >
            Cancel
          </Typography>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isCreating}
            sx={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '10px',
              backgroundColor: '#208BC9',
              padding: '10px 30px',
              boxShadow: 'none',
              position: 'relative',
            }}
          >
            {isCreating ? (
              <CircularProgress
                size={20}
                sx={{
                  color: '#fff',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
            ) : (
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '700',
                  fontSize: '12px',
                  color: '#FFFFFF',
                }}
              >
                Create
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateRateForm;