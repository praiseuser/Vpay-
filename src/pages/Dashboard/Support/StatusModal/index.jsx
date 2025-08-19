import { Box, Typography, Select, MenuItem, Button, Modal, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateTicketStatus } from '../../../../Hooks/useSupport';

const StatusModal = ({ open, onClose, ticket }) => {
  const [newStatus, setNewStatus] = useState(
    ticket?.status === 'Open' ? 'open' : ticket?.status === 'Closed' ? 'closed' : 'in progress'
  );
  const { updateTicketStatus, loading, error } = useUpdateTicketStatus();

  const handleSubmit = async () => {
    if (!newStatus) return toast.error('Please select a status');
    const result = await updateTicketStatus(ticket.id, newStatus);
    if (result.success) onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Update Status for Ticket #{ticket?.ticketNumber}
        </Typography>
        <Select
          fullWidth
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error}
          helperText={error}
        >
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Save Status'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StatusModal;