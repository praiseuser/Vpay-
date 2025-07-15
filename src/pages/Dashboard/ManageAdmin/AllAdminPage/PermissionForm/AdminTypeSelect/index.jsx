import React from 'react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';

const AdminTypeSelect = ({ adminTypes, loadingTypes, value, onChange }) => (
  <TextField
    select
    fullWidth
    label="Admin Type"
    name="admin_type_id"
    value={value}
    onChange={onChange}
    margin="normal"
    required
    disabled={loadingTypes}
  >
    {loadingTypes ? (
      <MenuItem disabled>
        <CircularProgress size={20} />
      </MenuItem>
    ) : adminTypes.length > 0 ? (
      adminTypes.map((type) => (
        <MenuItem key={type.id || type._id} value={type.id || type._id}>
          {type.admin_type}
        </MenuItem>
      ))
    ) : (
      <MenuItem disabled>No admin types found</MenuItem>
    )}
  </TextField>
);

export default AdminTypeSelect;
