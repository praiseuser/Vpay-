import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';
import { API_BASE_URL } from '../config/path';

export const useUpdateTicketStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.user.token);

  const updateTicketStatus = useCallback(
    async (ticketId, status) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      if (!ticketId) {
        const msg = 'Ticket ID is required';
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return { success: false, errors: { ticketId: msg } };
      }

      if (!status) {
        const msg = 'Status is required';
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return { success: false, errors: { status: msg } };
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}/admin/support-ticket/update`,
          { id: ticketId, status },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast(<CustomSuccessToast message="Ticket status updated successfully!" />);
        setSuccess(true);
        return { success: true, data: response.data };
      } catch (err) {
        const msg =
          err.response?.data?.message || err.message || 'Failed to update ticket status';
        toast(<CustomErrorToast message={msg} />);
        setError(msg);
        return { success: false, errors: { general: msg } };
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { updateTicketStatus, loading, error, success };
};

export const useSupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.user.token);

  // Fetch tickets
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/support-tickets`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTickets(response.data?.result || []);
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch tickets';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Update ticket status
  const updateTicketStatus = useCallback(async (ticketId, status) => {
    try {
      await axios.put(
        `${API_BASE_URL}/admin/support-ticket/update`,
        { ticketId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast(<CustomSuccessToast message="Ticket status updated successfully!" />);
      await fetchTickets();
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update ticket status';
      toast(<CustomErrorToast message={msg} />);
      return { success: false, errors: { general: msg } };
    }
  }, [token, fetchTickets]);

  // Reply to ticket (API not yet provided — placeholder)
  const replyToTicket = useCallback(async (ticketId, message) => {
    console.log('Reply to ticket API will go here:', ticketId, message);
    await fetchTickets();
  }, [fetchTickets]);

  // Delete ticket (API not yet provided — placeholder)
  const deleteTicket = useCallback(async (ticketId) => {
    console.log('Delete ticket API will go here:', ticketId);
    await fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    if (token) {
      fetchTickets();
    } else {
      setError('No authentication token found');
    }
  }, [token, fetchTickets]);

  return {
    tickets,
    loading,
    error,
    success,
    fetchTickets,
    updateTicketStatus,
    replyToTicket,
    deleteTicket
  };
};