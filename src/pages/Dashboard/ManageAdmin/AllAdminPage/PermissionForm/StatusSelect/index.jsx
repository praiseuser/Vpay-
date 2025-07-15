import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const StatusSelect = ({ value, onChange }) => (
  <TextField
    select
    fullWidth
    label="Status"
    name="status"
    value={value}
    onChange={onChange}
    margin="normal"
    required
  >
    <MenuItem value="1">Active</MenuItem>
    <MenuItem value="0">Inactive</MenuItem>
  </TextField>
);

export default StatusSelect;
