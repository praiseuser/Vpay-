import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const ViewAdminTypeModal = ({ open, onClose, adminType }) => {
  console.log('Modal rendering with adminType:', adminType);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100vh',
          width: '300px',
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">View Admin Type</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        {adminType ? (
          <Typography>Admin Type: {adminType.admin_type}</Typography>
        ) : (
          <Typography>No admin type data available</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ViewAdminTypeModal;