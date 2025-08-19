import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';
import { API_BASE_URL } from '../config/path';

const statusMap = {
  open: 0,
  'in progress': 2,
  closed: 1,
};
export const useReplyToTicket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const replyToTicket = useCallback(async (ticketId, replyMessage) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return { success: false };
    }

    if (!ticketId || !replyMessage || replyMessage.trim() === '') {
      setError('Ticket ID and a valid reply message are required');
      toast(<CustomErrorToast message="Ticket ID and a valid reply message are required" />);
      setLoading(false);
      return { success: false };
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/support-ticket/reply/${ticketId}`, {
        reply_message: replyMessage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Reply to ticket response:', response.data);

      if (response.data.success) {
        toast(<CustomSuccessToast message={`Successfully replied to ticket #${ticketId}`} />);
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to reply to ticket');
        toast(<CustomErrorToast message={response.data.message || 'Failed to reply to ticket'} />);
        return { success: false };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to reply to ticket';
      console.error('Error replying to ticket:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { replyToTicket, loading, error };
};
export const useFetchSupportTickets = (page = 1) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    let mounted = true;

    const fetchTickets = async () => {
      if (hasFetched.current || !mounted) return;

      setLoading(true);
      setError(null);

      if (!token) {
        console.warn('No token found in useFetchSupportTickets');
        setError('Authentication token is missing');
        toast(<CustomErrorToast message="Authentication token is missing" />);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/all/support-tickets/${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Fetched support tickets response:', response.data);

        const data = response.data.result || [];
        const formattedTickets = Array.isArray(data)
          ? data.map((item) => ({
            id: item.id || null,
            ticketNumber: item.ticket_number || null,
            subject: item.subject || 'No Subject',
            status: item.status === '1' ? 'Closed' : 'Open',
            createdAt: item.created_at || null,
          }))
          : [];

        if (formattedTickets.length === 0) {
          setError('No support tickets available');
          toast(<CustomErrorToast message="No support tickets found" />);
        } else {
          setTickets(formattedTickets);
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch support tickets';
        console.error('Error fetching support tickets:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
        setError(errorMessage);
        toast(<CustomErrorToast message={errorMessage} />);
      } finally {
        if (mounted) {
          setLoading(false);
          hasFetched.current = true;
          console.log('Fetch support tickets operation completed. Loading:', false);
        }
      }
    };

    fetchTickets();

    return () => {
      mounted = false;
    };
  }, [token, page]);

  const resetState = () => {
    setTickets([]);
    setError(null);
    hasFetched.current = false;
  };

  return {
    tickets,
    loading,
    error,
    fetchTickets: resetState,
  };
};
export const useFetchAllSupportTickets = (page = 1) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/admin/all/support-tickets/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Fetch all support tickets response:', response.data);

      const data = response.data.result?.tickets || [];
      const formattedTickets = Array.isArray(data)
        ? data.map((item) => ({
          id: item.id || null,
          ticketNumber: item.ticket_number || null,
          subject: item.subject || 'No Subject',
          status: item.status === '1' ? 'Closed' : item.status === '0' ? 'Open' : 'In Progress',
          createdAt: item.created_at || null,
        }))
        : [];

      setTickets(formattedTickets);
      if (formattedTickets.length === 0) {
        setError('No support tickets available');
        toast(<CustomErrorToast message="No support tickets found" />);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch all support tickets';
      console.error('Error fetching all support tickets:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  }, [token, page]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return { tickets, loading, error, fetchTickets };
};
export const useUpdateTicketStatus = (onSuccessCallback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const updateTicketStatus = useCallback(async (ticketId, status) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return { success: false };
    }

    if (!ticketId || !statusMap[status]) {
      setError('Valid ticket ID and status are required');
      toast(<CustomErrorToast message="Valid ticket ID and status are required" />);
      setLoading(false);
      return { success: false };
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/support-ticket/update/${ticketId}`, {
        status: statusMap[status],
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Update ticket status response:', response.data);

      if (response.data.success) {
        toast(<CustomSuccessToast message={`Successfully updated ticket #${ticketId} to ${status}`} />);
        if (onSuccessCallback) onSuccessCallback();
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to update ticket status');
        toast(<CustomErrorToast message={response.data.message || 'Failed to update ticket status'} />);
        return { success: false };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update ticket status';
      console.error('Error updating ticket status:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, onSuccessCallback]);

  return { updateTicketStatus, loading, error };
};
export const useDeleteTicket = (onSuccessCallback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const deleteTicket = useCallback(async (ticketId) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return { success: false };
    }

    if (!ticketId) {
      setError('Valid ticket ID is required');
      toast(<CustomErrorToast message="Valid ticket ID is required" />);
      setLoading(false);
      return { success: false };
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/support-ticket/delete/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete ticket response:', response.data);

      if (response.data.success) {
        toast(<CustomSuccessToast message={`Successfully deleted ticket #${ticketId}`} />);
        if (onSuccessCallback) onSuccessCallback();
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to delete ticket');
        toast(<CustomErrorToast message={response.data.message || 'Failed to delete ticket'} />);
        return { success: false };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete ticket';
      console.error('Error deleting ticket:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, onSuccessCallback]);

  return { deleteTicket, loading, error };
};
export const useFetchOpenSupportTickets = (page = 1) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/admin/support-tickets/open/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Fetch open support tickets response:', response.data);

      const data = response.data.result?.tickets || [];
      const formattedTickets = Array.isArray(data)
        ? data.map((item) => ({
          id: item.id || null,
          ticketNumber: item.ticket_number || null,
          subject: item.subject || 'No Subject',
          status: 'Open',
          createdAt: item.created_at || null,
        }))
        : [];

      setTickets(formattedTickets);
      if (formattedTickets.length === 0) {
        setError('No open support tickets available');
        toast(<CustomErrorToast message="No open support tickets found" />);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch open support tickets';
      console.error('Error fetching open support tickets:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  }, [token, page]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return { tickets, loading, error, fetchTickets };
};
export const useFetchClosedSupportTickets = (page = 1) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/admin/support-tickets/closed/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Fetch closed support tickets response:', response.data);

      const data = response.data.result?.tickets || [];
      const formattedTickets = Array.isArray(data)  
        ? data.map((item) => ({
          id: item.id || null,
          ticketNumber: item.ticket_number || null,
          subject: item.subject || 'No Subject',
          status: 'Closed',
          createdAt: item.created_at || null,
        }))
        : [];

      if (formattedTickets.length === 0) {
        setError('No closed support tickets available');
        toast(<CustomErrorToast message="No closed support tickets found" />);
      } else {
        setTickets(formattedTickets);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch closed support tickets';
      console.error('Error fetching closed support tickets:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  }, [token, page]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return { tickets, loading, error, fetchTickets };
};
export const useDeleteReply = (onSuccessCallback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const deleteReply = useCallback(async (replyId) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return { success: false };
    }

    if (!replyId) {
      setError('Valid reply ID is required');
      toast(<CustomErrorToast message="Valid reply ID is required" />);
      setLoading(false);
      return { success: false };
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/support-ticket/reply/delete/${replyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete reply response:', response.data);

      if (response.data.success) {
        toast(<CustomSuccessToast message={`Successfully deleted reply #${replyId}`} />);
        if (onSuccessCallback) onSuccessCallback();
        return { success: true };
      } else {
        setError(response.data.message || 'Failed to delete reply');
        toast(<CustomErrorToast message={response.data.message || 'Failed to delete reply'} />);
        return { success: false };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete reply';
      console.error('Error deleting reply:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, onSuccessCallback]);

  return { deleteReply, loading, error };
};