import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const CountryViewModal = ({ open, onClose, country }) => {
  console.log('Modal rendering with country:', country); // Debug log

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box
        sx={{
          height: '100vh',
          width: '400px',
          bgcolor: 'background.paper',
          borderRadius: '12px 0 0 12px',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {country ? (
          <>
            <Typography variant="h6" gutterBottom>
              Country Details
            </Typography>
            <Typography><strong>ID:</strong> {country.id}</Typography>
            <Typography><strong>Currency ID:</strong> {country.Currency_Id}</Typography>
            <Typography><strong>Name:</strong> {country.Country_name}</Typography>
            <Typography><strong>Code:</strong> {country.Country_code}</Typography>
            <Typography><strong>Dial Code:</strong> {country.Country_dial_code || 'N/A'}</Typography>
            <Typography><strong>Flag:</strong> {country.Country_Flag || 'N/A'}</Typography>
            <Typography><strong>Status:</strong> {country.status}</Typography>
          </>
        ) : (
          <Typography>No country data available</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default CountryViewModal;