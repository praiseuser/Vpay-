import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useAddAdminType } from '../../../../../Hooks/useAdmin';

const AddRolesPage = ({ onCancel, onRoleAdded }) => {
  const [adminType, setAdminType] = useState('');
  const { addAdminType, loading } = useAddAdminType();

  const handleSubmit = async () => {
    const result = await addAdminType({ admin_type: adminType });

    if (result?.success) {
      onRoleAdded({ id: result.data?.id || Date.now(), admin_type: adminType }); // Add to list
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper
        sx={{
          p: 4,
          border: '2px solid #DCE7EC',
          borderRadius: '16px',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" sx={{ color: '#4A85F6', fontWeight: 700, mb: 2 }}>
          Add Role
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Admin Type</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={adminType}
            onChange={(e) => setAdminType(e.target.value)}
            placeholder="Enter admin type"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                height: 40,
                fontSize: '0.85rem',
              },
              '& input': {
                padding: '10px 14px',
              },
            }}
          />

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={onCancel}
            sx={{
              textTransform: 'capitalize',
              fontWeight: 600,
              color: '#73757C',
            }}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              textTransform: 'capitalize',
              fontWeight: 600,
              backgroundColor: '#208BC9',
              borderRadius: '10px',
              px: 4,
              position: 'relative',
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: 'white' }} />
            ) : (
              'Add Role'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddRolesPage;
