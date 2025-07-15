import { Box, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useUpdateProvider } from '../../../../Hooks/useProvider';
import { toast } from 'react-toastify';
import Header from '../EditProviderModal/Header';
import ProviderFormFields from '../EditProviderModal/ProviderFormFields';
import FormActions from '../EditProviderModal/FormActions';

const EditProviderForm = ({ provider, onClose, onUpdate, countries }) => {
  const { updateProvider, loading, error, success, resetSuccess, setError } = useUpdateProvider();
  const [formData, setFormData] = useState({
    id: provider?.provider_id?.toString() || '',
    provider_name: provider?.provider_name || '',
    country_id: provider?.country_id?.toString() || '',
    unit_rate: provider?.unit_rate || '',
    provider_category: provider?.provider_category || '',
  });

  useEffect(() => {
    if (provider) {
      setFormData({
        id: provider.provider_id?.toString() || '',
        provider_name: provider.provider_name || '',
        country_id: provider.country_id?.toString() || '',
        unit_rate: provider.unit_rate || '',
        provider_category: provider.provider_category || '',
      });
    }
  }, [provider]);

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success('Provider updated successfully!');
      onUpdate(formData);
      onClose();
      resetSuccess();
    }
  }, [error, success, formData, onUpdate, onClose, resetSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'country_id' ? value.toString() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      setError('Provider ID is required');
      toast.error('Provider ID is required');
      return;
    }

    await updateProvider(formData.id, {
      provider_name: formData.provider_name,
      country_id: formData.country_id,
      unit_rate: formData.unit_rate,
      provider_category: formData.provider_category,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        p: 1,
        pt: 1,
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FFFFFF 70%, #F0F4F8 100%)',
          borderRadius: 10,
          padding: 2,
          width: '200%',
          maxWidth: 2000,
          minHeight: 100,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Header />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '95%',
            margin: '0 auto',
            p: 3,
            borderRadius: 10,
            boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, 0.07), 0 3px 8px rgba(0, 0, 0, 0.07)',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <ProviderFormFields
            formData={formData}
            handleChange={handleChange}
            countries={countries}
            loading={loading}
          />
          <FormActions loading={loading} onClose={onClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default EditProviderForm;