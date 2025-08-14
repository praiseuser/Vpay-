import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Checkbox, Grid, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CustomSwitch from '../../../../../components/CustomSwitch';
import { useAdminPermissions } from '../../../../../Hooks/useRolesPermission';

const modules = [
  { name: 'CURRENCIES' },
  { name: 'BLOG' },
  { name: 'FEES' },
  { name: 'COUNTRIES' },
  { name: 'USERS' },
];

const permissionsList = ['Create', 'Read', 'Update', 'Delete'];

const ViewRolesPermissions = ({ adminId, firstName, lastName, onBack }) => {
  const {
    permissions,
    loading,
    isUpdating,
    error,
    handlePermissionChange,
    handleAdminTypeToggle,
    updatePermissions,
  } = useAdminPermissions(adminId);

  const [formattedPermissions, setFormattedPermissions] = useState({});

  useEffect(() => {
    const formatted = {};
    modules.forEach(({ name }) => {
      const modulePerms = permissions?.[name] || {};
      const hasAnyPermission =
        modulePerms.create || modulePerms.read || modulePerms.update || modulePerms.delete;

      formatted[name] = {
        id: modulePerms.id || modulePerms.admin_type_id || '', // Use admin_type_id as fallback for id
        enabled: Boolean(modulePerms.checked || hasAnyPermission),
        create: modulePerms.create || false,
        read: modulePerms.read || false,
        update: modulePerms.update || false,
        delete: modulePerms.delete || false,
        admin_type_id: modulePerms.admin_type_id || '',
        checked: Boolean(modulePerms.checked),
      };
    });
    console.log('Formatted permissions with IDs:', formatted);
    setFormattedPermissions(formatted);
  }, [permissions]);

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

  const handleUpdateClick = async () => {
    const validPermissions = Object.fromEntries(
      Object.entries(formattedPermissions)
        .filter(([_, value]) => value.id && !isNaN(Number(value.id)))
        .map(([key, value]) => [
          key,
          {
            ...value,
            id: Number(value.id),
            checked: Boolean(value.checked),
          },
        ])
    );

    console.log('Final payload to updatePermissions:', validPermissions);

    const success = await updatePermissions(validPermissions);
    if (success) {
      // Optionally refetch or notify success (handled by hook toast)
    }
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
          <Typography mb={3} sx={{ fontFamily: 'Mada sans-serif', fontSize: '17px', fontWeight: 600, color: 'black' }}>
            {firstName} {lastName}: Role Permission
          </Typography>

          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minHeight: '50vh' }}>
            {loading ? (
              <Box height="50vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" sx={{ p: 2 }}>{error}</Typography>
            ) : (
              <Grid container spacing={3}>
                {modules.map((module) => (
                  <Grid item xs={12} md={6} key={module.name}>
                    <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Checkbox
                          checked={formattedPermissions[module.name]?.enabled || false}
                          onChange={() => handleToggle(module.name)}
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: 'Inter' }}>
                          {module.name}
                        </Typography>
                      </Box>

                      <Box display="flex" justifyContent="space-between" mt={2}>
                        {permissionsList.map((perm) => (
                          <Box key={perm} textAlign="center">
                            <Typography variant="caption" display="block" mb={0.5} sx={{ fontFamily: 'Inter' }}>
                              {perm}
                            </Typography>
                            <CustomSwitch
                              checked={formattedPermissions[module.name]?.[perm.toLowerCase()] || false}
                              disabled={!formattedPermissions[module.name]?.enabled}
                              onChange={() =>
                                handleSwitchChange(module.name, perm.toLowerCase())
                              }
                            />
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
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
        </Box>
      </Box>
    </Box>
  );
};

export default ViewRolesPermissions;