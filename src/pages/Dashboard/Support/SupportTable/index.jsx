import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import CustomTable from '../../../../components/CustomTable';
import CustomLoader from '../../../../components/CustomLoader';

const StyledTableCell = styled('span')(({ theme }) => ({
  fontFamily: 'Mada',
  padding: '8px',
  '&.header': {
    fontWeight: 600,
    backgroundColor: '#f5f5f5',
  },
  display: 'flex',
  alignItems: 'center',
}));

const SupportTable = ({
  tickets,
  loading,
  error,
  onDelete,
  onReplyOpen,
  onStatusOpen,
  deletingTicketId,
  emptyMessage = 'No support tickets found',
}) => {
  const formatRows = (data) => {
    if (!data || data.length === 0) {
      // ✅ Show message as one centered row (full-width)
      return [
        {
          id: (
            <StyledTableCell
              sx={{
                textAlign: 'center',
                justifyContent: 'center',
                width: '100%',
                gridColumn: '1 / -1',
              }}
              colSpan={5}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {emptyMessage}
              </Typography>
            </StyledTableCell>
          ),
          subject: '',
          status: '',
          createdAt: '',
          actions: '',
        },
      ];
    }

    return data.map((ticket) => ({
      id: <StyledTableCell>{ticket.ticketNumber}</StyledTableCell>,
      subject: <StyledTableCell>{ticket.subject}</StyledTableCell>,
      status: <StyledTableCell>{ticket.status}</StyledTableCell>,
      createdAt: (
        <StyledTableCell>
          {new Date(ticket.createdAt).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </StyledTableCell>
      ),
      actions: (
        <StyledTableCell>
          <Button onClick={() => onReplyOpen(ticket)} sx={{ mr: 1 }}>
            <ReplyIcon />
          </Button>
          <Button onClick={() => onStatusOpen(ticket)} sx={{ mr: 1 }}>
            <EditIcon />
          </Button>
          <Button onClick={() => onDelete(ticket.id)} disabled={deletingTicketId === ticket.id}>
            {deletingTicketId === ticket.id ? <CustomLoader size={20} /> : <DeleteIcon />}
          </Button>
        </StyledTableCell>
      ),
    }));
  };

  const columns = [
    { id: 'id', label: 'TICKET #', minWidth: 100 },
    { id: 'subject', label: 'SUBJECT', minWidth: 200 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'createdAt', label: 'CREATED AT', minWidth: 180 },
    { id: 'actions', label: 'ACTIONS', minWidth: 150 },
  ];

  return (
    <Box sx={{ position: 'relative', minHeight: '250px' }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 2,
          }}
        >
          <CustomLoader />
        </Box>
      )}

      <CustomTable
        columns={columns}
        rows={formatRows(tickets)}
        showAddButton={false}
        sx={{
          '& .MuiTableCell-root': { padding: '12px' },
          opacity: loading ? 0.5 : 1,
        }}
      />
    </Box>
  );
};

export default SupportTable;
