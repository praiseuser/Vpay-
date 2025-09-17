import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Fade, Backdrop, Box, Typography } from '@mui/material';

const ViewRateModal = ({ open, onClose, rate, loading }) => (
  <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{ timeout: 500 }}
  >
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', 
          width: 300,
          bgcolor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #DCE7EC',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto',
          maxHeight: '80vh', 
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: 'Mada, sans-serif',
            fontWeight: 700,
            color: '#1A237E',
            mb: 4,
            textAlign: 'center',
          }}
        >
          Rate Details
        </Typography>
        {loading ? (
          <Typography
            sx={{
              fontFamily: 'Mada, sans-serif',
              fontWeight: 500,
              color: '#1A237E',
              fontSize: '16px',
              textAlign: 'center',
            }}
          >
            Loading...
          </Typography>
        ) : rate && (rate.currency_id || rate.rate) ? (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'Mada, sans-serif',
                fontWeight: 500,
                color: '#1A237E',
                fontSize: '16px',
                mb: 2,
              }}
            >
              <strong>Currency ID:</strong> {rate.currency_id || 'N/A'}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Mada, sans-serif',
                fontWeight: 500,
                color: '#1A237E',
                fontSize: '16px',
                mb: 2,
              }}
            >
              <strong>Rate:</strong> {rate.rate || rate.Rate || 'N/A'}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Mada, sans-serif',
                fontWeight: 500,
                color: '#1A237E',
                fontSize: '16px',
                mb: 2,
              }}
            >
              <strong>Status:</strong> {rate.status === '1' || rate.status === 1 ? 'Enabled' : 'Disabled'}
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontFamily: 'Mada, sans-serif',
              fontWeight: 500,
              color: '#D32F2F',
              fontSize: '16px',
              textAlign: 'center',
              mb: 2,
            }}
          >
            No rate data available. Check if the API endpoint or ID is correct.
          </Typography>
        )}
      </Box>
    </Fade>
  </Modal>
);

ViewRateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  rate: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default ViewRateModal;