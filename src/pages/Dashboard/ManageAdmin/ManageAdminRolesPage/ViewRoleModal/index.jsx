import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useViewAdminTypeById } from '../../../../../Hooks/useAdmin';

export default function ViewRoleModal({ open, onClose, roleId }) {
  const { viewAdminType, adminType, loading, error } = useViewAdminTypeById();

  useEffect(() => {
    if (open && roleId) {
      viewAdminType(roleId);
    }
  }, [open, roleId]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-40%, -50%)', 
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 4,
        width: { xs: '80%', sm: 320, md: 360 },
        maxHeight: '70vh',
        overflowY: 'auto',
        outline: 'none',
        zIndex: 1300,
        resize: 'both',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
      tabIndex={-1}
    >
      <IconButton
        onClick={onClose}
        sx={{ alignSelf: 'flex-end', mb: 0.5 }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      {loading ? (
        <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />
      ) : error ? (
        <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
          {error}
        </Typography>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'medium',
              color: 'text.secondary',
              mb: 0.5,
            }}
          >
            Admin Type:
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontFamily: "'Mada', sans-serif",
              color: 'primary.main',
              letterSpacing: 1,
            }}
          >
            {adminType?.admin_type || 'N/A'}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
