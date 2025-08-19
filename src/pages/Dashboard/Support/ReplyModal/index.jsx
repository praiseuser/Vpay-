import { Box, Typography, TextField, Button, Modal, CircularProgress, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReplyToTicket } from '../../../../Hooks/useSupport';
import { useDeleteReply } from '../../../../Hooks/useSupport';

const ReplyModal = ({ open, onClose, ticket, onReplySubmit }) => {
  const [replyText, setReplyText] = useState('');
  const { replyToTicket, loading: replyLoading, error: replyError } = useReplyToTicket();
  const { deleteReply, loading: deleteLoading, error: deleteError } = useDeleteReply(() => {
    onReplySubmit?.();
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (ticket) {
      console.log('Ticket data in ReplyModal:', ticket); // Debug the ticket object
      const initialMessages = [
        {
          id: `ticket-${ticket.ticketNumber}`,
          sender: 'user',
          text: ticket.subject || '', // Using ticket.subject for the message to reply to
        },
      ];

      if (ticket.reply_message) {
        const replies = Array.isArray(ticket.reply_message)
          ? ticket.reply_message
          : [ticket.reply_message];
        const replyMessages = replies.map((reply, index) => ({
          id: ticket.reply_id?.[index] || `reply-${index}`,
          sender: 'admin',
          text: reply || '',
        }));
        initialMessages.push(...replyMessages);
      }

      setMessages(initialMessages);
    }
  }, [ticket]);

  const handleSubmit = async () => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    const result = await replyToTicket(ticket.id, replyText);
    if (result.success) {
      setReplyText('');
      onReplySubmit?.(replyText);
      onClose();
    }
  };

  const handleDeleteReply = async (replyId) => {
    const result = await deleteReply(replyId);
    if (result.success) {
      setMessages((prev) => prev.filter((msg) => msg.id !== replyId));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Ticket #{ticket?.ticketNumber}
        </Typography>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            mb: 2,
            p: 2,
            bgcolor: '#f5f5f5',
            borderRadius: 1,
            maxHeight: '50vh',
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-start' : 'flex-end',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  p: 2,
                  bgcolor: msg.sender === 'user' ? '#e0f7fa' : '#d1c4e9',
                  borderRadius: 2,
                  position: 'relative',
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
                {msg.sender === 'admin' && (
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteReply(msg.id)}
                    disabled={deleteLoading}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          sx={{ mb: 2 }}
          error={!!replyError || !!deleteError}
          helperText={replyError || deleteError}
          placeholder="Type your reply..."
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={replyLoading || deleteLoading}
            sx={{ bgcolor: '#008080', '&:hover': { bgcolor: '#006666' } }}
          >
            {replyLoading ? <CircularProgress size={20} /> : 'Send Reply'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReplyModal;