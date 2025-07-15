import React from 'react';
import { Box, Grid, Alert, Typography } from '@mui/material';
import InputField from '../../AddProviderForm/InputField';
import SubmitButtons from '../../AddProviderForm/SubmitButtons';

const ProviderForm = ({
  formData,
  handleChange,
  handleSubmit,
  isCreating,
  error,
  countries,
  onCancel,
}) => {
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pl: 2 }}>
          <Typography sx={{ fontSize: '25px', fontFamily: 'Mada', fontWeight: '500', marginLeft: '20px', }}>Add Provider</Typography>
        </Box>
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
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <InputField
                name="provider_name"
                label="Provider Name"
                value={formData.provider_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                name="country_id"
                label="Country"
                value={formData.country_id}
                onChange={handleChange}
                required
                select
                options={countries.map((country) => ({
                  value: country.country_id.toString(),
                  label: `${country.country_name} (${country.country_code})`,
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                name="unit_rate"
                label="Unit Rate"
                type="number"
                value={formData.unit_rate}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                name="provider_category"
                label="Category"
                value={formData.provider_category}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                name="status"
                label="Status"
                value={formData.status}
                onChange={handleChange}
                required
                select
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12}>
              <SubmitButtons isCreating={isCreating} onCancel={onCancel} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProviderForm;