import React, { useState } from 'react';
import { Grid, Button, CircularProgress, Box, Typography } from '@mui/material';
import FormInput from '../AddAdminForm/FormInput';
import SelectField from '../AddAdminForm/SelectField';
import MultiSelectField from '../AddAdminForm/MultiSelectField';
import UsernameField from '../AddAdminForm/UsernameField';
import { useAddAdmin } from '../../../../../Hooks/useRolesPermission';

const initialState = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  phone: '',
  gender: '',
  sub_role: [],
  country_id: '',
};

const genders = ['Male', 'Female'];

export default function AddAdminForm({ adminTypes, countries, onCancel }) {
  const [formData, setFormData] = useState(initialState);
  const { addAdmin, loading } = useAddAdmin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      sub_role: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAdmin(formData);
    setFormData(initialState);
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
        <Box
          sx={{
            width: '95%',
            margin: '0 auto',
            p: 3,
            borderRadius: 10,
            boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, 0.07), 0 3px 8px rgba(0, 0, 0, 0.07)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormInput name="firstname" label="FIRSTNAME" value={formData.firstname} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput name="lastname" label="LASTNAME" value={formData.lastname} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput name="email" label="EMAIL" value={formData.email} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput name="phone" label="PHONE" value={formData.phone} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectField
                  name="gender"
                  label="GENDER"
                  value={formData.gender}
                  options={genders}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MultiSelectField
                  name="sub_role"
                  label="SUB ROLES*"
                  value={formData.sub_role}
                  options={adminTypes}
                  onChange={handleMultiSelectChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectField
                  name="country_id"
                  label="COUNTRY*"
                  value={formData.country_id}
                  options={countries.map((c) => ({ label: c.country_name, value: String(c.id) }))}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <UsernameField name="username" label="USERNAME" value={formData.username} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                  sx={{ height: 35, borderRadius: '10px', fontSize: 14, minWidth: 150 }}
                >
                  {loading ? 'Submitting...' : 'Add Admin'}
                </Button>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: 'pointer', mt: 1 }}
                  onClick={onCancel}
                >
                  Cancel
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}