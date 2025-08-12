import { useState, useEffect } from 'react';
import { Box, Typography, Modal, TextField, Select, MenuItem, CircularProgress, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import CustomTable from '../../../components/CustomTable';
import { useSupportTickets } from '../../../Hooks/useSupport';
import { useUpdateTicketStatus } from '../../../Hooks/useSupport';

const StyledTableCell = styled('span')(({ theme }) => ({
  fontFamily: 'Mada',
  padding: '8px',
  '&.header': {
    fontWeight: 600,
    backgroundColor: '#f5f5f5',
  },
}));

const Support = () => {
  const { tickets, loading, error, fetchTickets } = useSupportTickets();
  const { updateTicketStatus, loading: statusLoading } = useUpdateTicketStatus(fetchTickets);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleReplyOpen = (ticket) => {
    setSelectedTicket(ticket);
    setReplyOpen(true);
  };

  const handleStatusOpen = (ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setStatusOpen(true);
  };

  const handleDelete = (ticketId) => {
    toast.info(`Deleting ticket #${ticketId}...`);
    // TODO: integrate delete hook, then fetchTickets()
  };

  const handleReplyClose = () => setReplyOpen(false);
  const handleStatusClose = () => setStatusOpen(false);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      toast.info(`Replying to ticket #${selectedTicket.id}...`);
      // TODO: integrate reply hook, then fetchTickets()
      setReplyText('');
      handleReplyClose();
    }
  };

  const handleStatusSubmit = async () => {
    if (!newStatus) return toast.error('Please select a status');

    const res = await updateTicketStatus(selectedTicket.id, newStatus);

    if (res.success) {
      toast.success(`Status updated to "${newStatus}"`);
      handleStatusClose();
    }
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  const formatRows = (data) =>
    data.map((ticket) => ({
      id: <StyledTableCell>{ticket.id}</StyledTableCell>,
      subject: <StyledTableCell>{ticket.subject}</StyledTableCell>,
      status: <StyledTableCell>{ticket.status}</StyledTableCell>,
      createdAt: <StyledTableCell>{ticket.createdAt}</StyledTableCell>,
      actions: (
        <StyledTableCell>
          <Button onClick={() => handleReplyOpen(ticket)} sx={{ mr: 1 }}>
            <ReplyIcon />
          </Button>
          <Button onClick={() => handleStatusOpen(ticket)} sx={{ mr: 1 }}>
            <EditIcon />
          </Button>
          <Button onClick={() => handleDelete(ticket.id)}>
            <DeleteIcon />
          </Button>
        </StyledTableCell>
      ),
    }));

  const columns = [
    { id: 'id', label: 'ID', minWidth: 70 },
    { id: 'subject', label: 'Subject', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 120 },
    { id: 'createdAt', label: 'Created At', minWidth: 150 },
    { id: 'actions', label: 'Actions', minWidth: 150 },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Mada', fontWeight: 600 }}>
        Support Tickets
      </Typography>
      <Box>
        <CustomTable
          columns={columns}
          rows={formatRows(tickets)}
          showAddButton={false}
          sx={{ '& .MuiTableCell-root': { padding: '12px' } }}
        />
      </Box>

      {/* Reply Modal */}
      <Modal open={replyOpen} onClose={handleReplyClose}>
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
            Reply to Ticket #{selectedTicket?.id}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleReplyClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleReplySubmit}>
              Send Reply
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Status Modal */}
      <Modal open={statusOpen} onClose={handleStatusClose}>
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
            Update Status for Ticket #{selectedTicket?.id}
          </Typography>
          <Select
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleStatusClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleStatusSubmit}
              disabled={statusLoading}
            >
              {statusLoading ? <CircularProgress size={20} /> : 'Save Status'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Support;
