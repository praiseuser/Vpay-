import React, { useEffect, useState } from 'react';
import { Box, Alert, Grid } from '@mui/material';
import { usePermissions } from '../../../../../Hooks/useRolesPermission';
import AdminIdField from '../PermissionForm/AdminIdField';
import AdminTypeSelect from '../PermissionForm/AdminTypeSelect';
import PermissionSwitches from '../PermissionForm/PermissionSwitches';
import StatusSelect from '../PermissionForm/StatusSelect';
import FormButtons from '../PermissionForm/FormButton';

const PermissionForm = ({
  selectedAdminId = '',
  adminTypes = [],
  loadingTypes = false,
  onSubmitSuccess,
  onCancel,
}) => {
  const {
    createPermission,
    createLoading,
    createError,
    successMessage,
  } = usePermissions(selectedAdminId);

  const [formData, setFormData] = useState({
    admin_id: selectedAdminId,
    admin_type_id: '',
    create: false,
    read: false,
    update: false,
    delete: false,
    status: '1',
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      admin_id: selectedAdminId || '',
    }));
  }, [selectedAdminId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.admin_id) {
      console.error('Admin ID is missing in form data:', formData);
      return;
    }
    console.log('Submitting form data:', formData); 
    try {
      await createPermission(formData);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch {
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        p: 2,
        pt: 3,
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
          {createError && <Alert severity="error">{createError}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <AdminIdField adminId={formData.admin_id} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AdminTypeSelect
                adminTypes={adminTypes}
                loadingTypes={loadingTypes}
                value={formData.admin_type_id}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatusSelect value={formData.status} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <PermissionSwitches formData={formData} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <FormButtons loading={createLoading} onCancel={onCancel} sx={{ '& button': { minWidth: 100, height: 35, borderRadius: '10px', fontSize: 14, padding: '0 10px' } }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PermissionForm;