import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Chip,
} from '@mui/material';
import { useFetchUserById } from '../../../../Hooks/useUsers';

const UserDetailsDrawer = ({ open, onClose, userId }) => {
  const { user, loading, error } = useFetchUserById(userId);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 2000 }}>
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          User Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : user ? (
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              User ID
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.id}
            </Typography>

            <Typography variant="subtitle2" color="textSecondary">
              Name
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.firstname} {user.lastname}
            </Typography>

            <Typography variant="subtitle2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.email}
            </Typography>

            <Typography variant="subtitle2" color="textSecondary">
              Phone
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.phone}
            </Typography>

            <Typography variant="subtitle2" color="textSecondary">
              Gender
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.gender}
            </Typography>

            <Typography variant="subtitle2" color="textSecondary">
              Status
            </Typography>
            <Chip
              label={user.status === 1 ? 'Active' : 'Inactive'}
              color={user.status === 1 ? 'success' : 'default'}
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle2" color="textSecondary">
              Created At
            </Typography>
            <Typography variant="body1">{user.created_at}</Typography>
          </Box>
        ) : (
          <Typography>No user details available.</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default UserDetailsDrawer;
