import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  CircularProgress,
  Select,
} from '@mui/material';
import { useCreateRate } from '../../../../Hooks/useRateCurrency';
import PasswordModal from '../../Card/PasswordModal';

const CreateRateForm = ({ handleCancel }) => {
  const {
    createRate,
    isCreating,
    error: hookError,
    currencies = [],
    passwordVerified,
    showPasswordModal,
    setShowPasswordModal,
    resetState,
  } = useCreateRate();

  const [rate, setRate] = useState('');
  const [status, setStatus] = useState('1');
  const [selectedCurrencyId, setSelectedCurrencyId] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    console.log('Current currencies in form:', currencies);
  }, [currencies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statusValue = status === 'null' ? null : status;

    if (!selectedCurrencyId || !rate) {
      toast.error("Please fill all required fields (Currency and Rate)");
      return;
    }

    if (passwordVerified) {
      const result = await createRate(selectedCurrencyId, rate, statusValue, accountPassword);
      if (result.success) {
        setRate('');
        setStatus('1');
        setSelectedCurrencyId('');
        handleCancel();
      }
    } else {
      setShowPasswordModal(true); // Show modal only after valid form submission
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

  const handlePasswordSubmit = async () => {
    if (!accountPassword.trim()) {
      return;
    }
    
    setPasswordLoading(true);
    const statusValue = status === 'null' ? null : status;
    const result = await createRate(selectedCurrencyId, rate, statusValue, accountPassword);
    setPasswordLoading(false);
    
    if (result.success) {
      setAccountPassword('');
      setRate('');
      setStatus('1');
      setSelectedCurrencyId('');
      handleCancel();
    }
  };

  const handlePasswordModalClose = () => {
    resetState();
    handleCancel();
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ 
        opacity: showPasswordModal ? 0.3 : 1,
        pointerEvents: showPasswordModal ? 'none' : 'auto',
        transition: 'opacity 0.3s ease'
      }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
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
            name="currency_id"
            value={selectedCurrencyId}
            onChange={handleFormChange}
            variant="outlined"
            fullWidth
            displayEmpty
            renderValue={(value) =>
              value
                ? currencies.find((c) => c.currency_id === value)?.currency_name || 'Select a currency'
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
                <MenuItem key={currency.currency_id} value={currency.currency_id}>
                  {currency.currency_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No currencies available</MenuItem>
            )}
          </Select>
        </Box>

        {/* Rate Field */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
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
            name="rate"
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
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
            name="status"
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
          <PasswordModal 
            open={showPasswordModal} 
            onClose={handlePasswordModalClose}
            onSubmit={handlePasswordSubmit}
            password={accountPassword}
            setPassword={setAccountPassword}
            loading={passwordLoading || isCreating}
            error={hookError}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRateForm;