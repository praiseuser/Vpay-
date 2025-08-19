import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Checkbox, Grid, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CustomSwitch from '../../../../../components/CustomSwitch';
import { useFetchAdminPermissions } from '../../../../../Hooks/useRolesPermission';
import { useUpdateAdminPermissions } from '../../../../../Hooks/useRolesPermission';
import PasswordModal from '../ViewRolesPermissions/PasswordModal'; // Adjust path as needed

const permissionsList = ['Create', 'Read', 'Update', 'Delete'];

const ViewRolesPermissions = ({ Adminid, firstName, lastName, onBack }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const {
    permissions,
    setPermissions,
    loading,
    error: fetchError,
  } = useFetchAdminPermissions(Adminid); // Pass Adminid as id to the fetch hook

  const {
    isUpdating,
    error: updateError,
    handlePermissionChange,
    handleAdminTypeToggle,
    updatePermissions,
  } = useUpdateAdminPermissions(Adminid, permissions, setPermissions);

  console.log('Received Adminid (used as id for fetch, admin_id for update) in ViewRolesPermissions:', Adminid);

  const [formattedPermissions, setFormattedPermissions] = useState({});

  useEffect(() => {
    const formatted = {};
    if (permissions && Object.keys(permissions).length > 0) {
      Object.keys(permissions).forEach((moduleName) => {
        const modulePerms = permissions[moduleName] || {};
        const hasAnyPermission =
          modulePerms.create || modulePerms.read || modulePerms.update || modulePerms.delete;
        if (modulePerms.admin_type_id && !isNaN(Number(modulePerms.admin_type_id)) && Number(modulePerms.admin_type_id) > 0) {
          formatted[moduleName] = {
            admin_type_id: modulePerms.admin_type_id,
            enabled: Boolean(modulePerms.checked || hasAnyPermission),
            create: modulePerms.create || false,
            read: modulePerms.read || false,
            update: modulePerms.update || false,
            delete: modulePerms.delete || false,
            checked: Boolean(modulePerms.checked),
          };
        }
      });
    }
    console.log('Formatted permissions for Adminid (id for fetch, admin_id for update):', Adminid, formatted);
    setFormattedPermissions(formatted);
  }, [permissions, Adminid]);

  const handleToggle = (moduleName) => {
    const isEnabled = !formattedPermissions[moduleName]?.enabled;

    setFormattedPermissions((prev) => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        enabled: isEnabled,
        checked: isEnabled,
        ...(isEnabled ? {} : { create: false, read: false, update: false, delete: false }),
      },
    }));

    handleAdminTypeToggle(moduleName, isEnabled);
  };

  const handleSwitchChange = (moduleName, perm) => {
    const newValue = !formattedPermissions[moduleName]?.[perm.toLowerCase()];
    setFormattedPermissions((prev) => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        [perm.toLowerCase()]: newValue,
      },
    }));

    handlePermissionChange(moduleName, perm.toLowerCase(), newValue);
  };

  const handlePasswordSubmit = async () => {
    if (!accountPassword.trim()) {
      return;
    }
    
    setPasswordLoading(true);
    const updateFunc = updatePermissions(formattedPermissions);
    const success = await updateFunc(accountPassword);
    setPasswordLoading(false);
    
    if (success) {
      setAccountPassword('');
      setModalOpen(false);
    }
  };

  const handlePasswordModalClose = () => {
    setModalOpen(false);
  };

  const handleUpdateClick = () => {
    setModalOpen(true);
  };

  // Combine errors: show fetchError if present, otherwise show updateError
  const displayError = fetchError || updateError;

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
          <Typography mb={3} sx={{ fontFamily: 'Mada sans-serif', fontSize: '17px', fontWeight: 600, color: 'black' }}>
            {firstName} {lastName}: Role Permission
          </Typography>

          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minHeight: '50vh' }}>
            {loading ? (
              <Box height="50vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : displayError ? (
              <Typography color="error" sx={{ p: 2 }}>{displayError}</Typography>
            ) : (
              <Grid container spacing={3}>
                {Object.keys(formattedPermissions).length > 0 ? (
                  Object.keys(formattedPermissions).map((moduleName) => (
                    <Grid item xs={12} md={6} key={moduleName}>
                      <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <Checkbox
                            checked={formattedPermissions[moduleName]?.enabled || false}
                            onChange={() => handleToggle(moduleName)}
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: 'Inter' }}>
                            {moduleName}
                          </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mt={2}>
                          {permissionsList.map((perm) => (
                            <Box key={perm} textAlign="center">
                              <Typography variant="caption" display="block" mb={0.5} sx={{ fontFamily: 'Inter' }}>
                                {perm}
                              </Typography>
                              <CustomSwitch
                                checked={formattedPermissions[moduleName]?.[perm.toLowerCase()] || false}
                                disabled={!formattedPermissions[moduleName]?.enabled}
                                onChange={() =>
                                  handleSwitchChange(moduleName, perm.toLowerCase())
                                }
                              />
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Typography sx={{ p: 2 }}>No permissions available for this admin.</Typography>
                )}
              </Grid>
            )}
          </Paper>

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#008080',
                '&:hover': { bgcolor: '#006666' },
                fontFamily: 'Inter',
              }}
              disabled={isUpdating}
              onClick={handleUpdateClick}
            >
              {isUpdating ? 'Updating...' : 'Update Role'}
            </Button>
          </Box>

          <PasswordModal 
            open={modalOpen} 
            onClose={handlePasswordModalClose}
            onSubmit={handlePasswordSubmit}
            password={accountPassword}
            setPassword={setAccountPassword}
            loading={passwordLoading || isUpdating}
            error={updateError} // Use updateError for the modal
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewRolesPermissions;