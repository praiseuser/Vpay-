import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, FormControl, OutlinedInput, Button, Select } from '@mui/material';
import FiatTable from '../FiatCurrencyPage/FiatTable';
import PasswordModal from '../../Card/PasswordModal';
import { useFetchFiatCurrencies, useUpdateFiat } from '../../../../Hooks/useFiatCurrency';
import { pageContainerStyle } from '../FiatCurrencyPage/fiatStyles';

const FiatCurrencyPage = ({ activeTab, setActiveTab, isMobile }) => {
  const [editingFiat, setEditingFiat] = useState(null);
  const [formData, setFormData] = useState({
    fiat_currency_name: '',
    fiat_currency_code: '',
    country_code: '',
    status: '1',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);

  const { fiatCurrencies, loading, fetchFiat } = useFetchFiatCurrencies();
  const updateFiat = useUpdateFiat();

  const handleEditClick = (fiat) => {
    setEditingFiat(fiat);
    setFormData({
      fiat_currency_name: fiat.fiat_currency_name,
      fiat_currency_code: fiat.fiat_currency_code,
      country_code: fiat.country_code,
      status: fiat.status.toString(),
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setShowPasswordModal(true); // show password modal on form submit
  };

  const handlePasswordSubmit = async () => {
    if (!editingFiat) return;
    setLoadingButton(true);
    try {
      await updateFiat(editingFiat.id, formData, verifyPassword);
      setShowPasswordModal(false);
      setVerifyPassword('');
      setEditingFiat(null);
      await fetchFiat(); // refresh the data
    } catch (error) {
      console.error('Failed to update fiat currency:', error);
    } finally {
      setLoadingButton(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingFiat(null);
    setFormData({
      fiat_currency_name: '',
      fiat_currency_code: '',
      country_code: '',
      status: '1',
    });
  };

  return (
    <Box
      className={`p-${isMobile ? '2' : '6'} w-full`}
      style={isMobile ? { ...pageContainerStyle, height: '100vh' } : pageContainerStyle}
    >
      {editingFiat ? (
        <Box
          sx={{
            backgroundColor: 'white',
            p: 3,
            borderRadius: 2,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Typography variant="h5" mb={2}>
            Edit Fiat Currency
          </Typography>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <Typography variant="caption">Currency Name</Typography>
              <OutlinedInput
                value={formData.fiat_currency_name}
                onChange={(e) => handleInputChange('fiat_currency_name', e.target.value)}
                placeholder="Enter currency name"
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="caption">Currency Code</Typography>
              <OutlinedInput
                value={formData.fiat_currency_code}
                onChange={(e) => handleInputChange('fiat_currency_code', e.target.value)}
                placeholder="Enter currency code"
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="caption">Country Code</Typography>
              <OutlinedInput
                value={formData.country_code}
                onChange={(e) => handleInputChange('country_code', e.target.value)}
                placeholder="Enter country code"
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="caption">Status</Typography>
              <Select
                native
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <FiatTable
          fiatData={fiatCurrencies}
          handleEditClick={handleEditClick}
          loading={loading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {showPasswordModal && (
        <PasswordModal
          open={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          password={verifyPassword}
          setPassword={setVerifyPassword}
          onSubmit={handlePasswordSubmit}
          loading={loadingButton}
        />
      )}
    </Box>
  );
};

export default FiatCurrencyPage;
