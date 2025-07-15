import React from 'react';
import { TextField } from '@mui/material';

const AdminIdField = ({ adminId }) => (
  <TextField
    fullWidth
    label="Admin ID"
    value={adminId || ''} 
    name="admin_id"
    margin="normal"
    disabled
  />
);

export default AdminIdField;