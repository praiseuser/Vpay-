import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCreateRate } from '../../../../Hooks/useRateCurrency';
import PasswordModal from '../../Card/PasswordModal';
import InputField from '../CreateRateForm/InputField';
import ProgressIndicator from '../CreateRateForm/ProgressIndicator';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const FormContainer = styled(Box)`
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    animation: ${pulse} 6s infinite;
  }
`;

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
  const [isFieldComplete, setIsFieldComplete] = useState({
    currency: false,
    rate: false,
    status: false,
  });

  useEffect(() => {
    console.log('Current currencies in form:', currencies);
  }, [currencies]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currency_id') {
      setSelectedCurrencyId(value);
      setIsFieldComplete((prev) => ({ ...prev, currency: !!value }));
    } else if (name === 'rate') {
      setRate(value);
      setIsFieldComplete((prev) => ({ ...prev, rate: !!value }));
    } else if (name === 'status') {
      setStatus(value);
      setIsFieldComplete((prev) => ({ ...prev, status: !!value }));
    }
  };

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
        setIsFieldComplete({ currency: false, rate: false, status: false });
        handleCancel();
      }
    } else {
      setShowPasswordModal(true);
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
      setIsFieldComplete({ currency: false, rate: false, status: false });
      handleCancel();
    }
  };

  const handlePasswordModalClose = () => {
    resetState();
    handleCancel();
  };

  const isFormValid = selectedCurrencyId && rate && status;

  return (
    <FormContainer>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          id="create-rate-modal"
          sx={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '20px',
            color: '#02042D',
            mb: 3,
          }}
        >
          Create Rate
        </Typography>

        <InputField
          label="Currency"
          name="currency_id"
          value={selectedCurrencyId}
          onChange={handleFormChange}
          options={currencies.map(currency => ({ value: currency.currency_id, label: currency.currency_name }))}
        />
        <InputField
          label="Rate"
          name="rate"
          value={rate}
          onChange={handleFormChange}
          type="number"
          placeholder="e.g., 50000"
        />
        <InputField
          label="Status"
          name="status"
          value={status}
          onChange={handleFormChange}
          options={[
            { value: '1', label: 'Enabled' },
            { value: '0', label: 'Disabled' },
            { value: 'null', label: 'Null' },
          ]}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3, mr: '80px' }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '12px',
              color: '#73757C',
              borderColor: '#D9D9D9',
              padding: '10px 25px',
              '&:hover': {
                borderColor: '#4A85F6',
                color: '#4A85F6',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isCreating || !isFormValid}
            sx={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'capitalize',
              borderRadius: '12px',
              backgroundColor: '#02042D',
              padding: '10px 35px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              '&:disabled': {
                backgroundColor: '#b0bec5',
              },
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
                  fontSize: '14px',
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

      <ProgressIndicator steps={[isFieldComplete.currency, isFieldComplete.rate, isFieldComplete.status]} />
    </FormContainer>
  );
};

export default CreateRateForm;