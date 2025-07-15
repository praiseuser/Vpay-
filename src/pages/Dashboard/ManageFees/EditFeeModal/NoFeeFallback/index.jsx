import { Modal, Box, Typography, Button } from '@mui/material';

const NoFeeFallback = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 4,
        width: { xs: '90%', sm: 500 },
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 24,
        position: 'relative',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Edit Fee
      </Typography>
      <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
        No fee data available. Please try again.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default NoFeeFallback;
