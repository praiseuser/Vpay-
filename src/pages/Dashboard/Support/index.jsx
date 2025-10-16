import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import {
  useFetchAllSupportTickets,
  useFetchOpenSupportTickets,
  useFetchClosedSupportTickets,
  useUpdateTicketStatus,
  useDeleteTicket,
} from '../../../Hooks/useSupport';
import ReplyModal from '../Support/ReplyModal';
import StatusModal from '../Support/StatusModal';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import SupportTable from '../Support/SupportTable';

const Support = () => {
  const {
    tickets: allTickets,
    loading: allLoading,
    error: allError,
    fetchTickets: fetchAllTickets,
  } = useFetchAllSupportTickets(1);

  const {
    tickets: openTickets,
    loading: openLoading,
    error: openError,
    fetchTickets: fetchOpenTickets,
  } = useFetchOpenSupportTickets(1);

  const {
    tickets: closedTickets,
    loading: closedLoading,
    error: closedError,
    fetchTickets: fetchClosedTickets,
  } = useFetchClosedSupportTickets(1);

  const { updateTicketStatus, loading: statusLoading } = useUpdateTicketStatus();
  const { deleteTicket } = useDeleteTicket();

  const [tickets, setTickets] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [deletingTicketId, setDeletingTicketId] = useState(null);
  const [hasShownError, setHasShownError] = useState(false);


  useEffect(() => {
    if (activeTabIndex === 0) fetchAllTickets();
    else if (activeTabIndex === 1) fetchOpenTickets();
    else if (activeTabIndex === 2) fetchClosedTickets();

    setHasShownError(false); 
  }, [activeTabIndex, fetchAllTickets, fetchOpenTickets, fetchClosedTickets]);

  useEffect(() => {
    if (activeTabIndex === 0) fetchAllTickets(true);
    else if (activeTabIndex === 1) fetchOpenTickets(true);
    else if (activeTabIndex === 2) fetchClosedTickets(true);
  }, [activeTabIndex]);


  useEffect(() => {
    if (hasShownError) return;

    if (activeTabIndex === 0 && allError) {
      toast.error(allError);
      setHasShownError(true);
    } else if (activeTabIndex === 1 && openError) {
      toast.error(openError);
      setHasShownError(true);
    } else if (activeTabIndex === 2 && closedError) {
      toast.error(closedError);
      setHasShownError(true);
    }
  }, [activeTabIndex, allError, openError, closedError, hasShownError]);

  const handleReplyOpen = (ticket) => {
    setSelectedTicket(ticket);
    setReplyOpen(true);
  };

  const handleStatusOpen = (ticket) => {
    setSelectedTicket(ticket);
    setStatusOpen(true);
  };

  const handleDelete = async (ticketId) => {
    setDeletingTicketId(ticketId);
    const result = await deleteTicket(ticketId);
    if (result.success) {
      toast.success(`Ticket #${ticketId} deleted successfully`);
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.ticketNumber !== ticketId)
      );

      if (activeTabIndex === 0) await fetchAllTickets();
      else if (activeTabIndex === 1) await fetchOpenTickets();
      else if (activeTabIndex === 2) await fetchClosedTickets();
    }
    setDeletingTicketId(null);
  };

  const handleReplySubmit = async (replyText) => {
    if (replyText.trim()) {
      toast.info(`Replying to ticket #${selectedTicket.ticketNumber}...`);
      setReplyOpen(false);
    }
  };

  const handleStatusSubmit = async (newStatus) => {
    if (!newStatus) return toast.error('Please select a status');
    const res = await updateTicketStatus(selectedTicket.id, newStatus);
    if (res.success) {
      toast.success(`Status updated to "${newStatus}"`);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === selectedTicket.id
            ? { ...ticket, status: newStatus }
            : ticket
        )
      );
    }
  };

  const loading =
    activeTabIndex === 0
      ? allLoading
      : activeTabIndex === 1
        ? openLoading
        : activeTabIndex === 2
          ? closedLoading
          : false;

  const error =
    activeTabIndex === 0
      ? allError
      : activeTabIndex === 1
        ? openError
        : activeTabIndex === 2
          ? closedError
          : null;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <CustomTabs
          tabLabels={['All', 'Open', 'Closed', 'Replied']}
          value={activeTabIndex}
          onChange={(event, newValue) => setActiveTabIndex(newValue)}
        />
      </Box>

      <SupportTable
        tickets={tickets}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        onReplyOpen={handleReplyOpen}
        onStatusOpen={handleStatusOpen}
        deletingTicketId={deletingTicketId}
        emptyMessage="No tickets available"
      />

      <ReplyModal
        open={replyOpen}
        onClose={() => setReplyOpen(false)}
        ticket={selectedTicket}
        onReplySubmit={handleReplySubmit}
      />

      <StatusModal
        open={statusOpen}
        onClose={() => setStatusOpen(false)}
        ticket={selectedTicket}
        onStatusSubmit={handleStatusSubmit}
        statusLoading={statusLoading}
      />
    </Box>
  );
};

export default Support;
