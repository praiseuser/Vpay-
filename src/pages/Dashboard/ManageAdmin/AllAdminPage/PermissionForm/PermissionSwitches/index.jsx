import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';

const PermissionSwitches = ({ formData, onChange }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
    {['create', 'read', 'update', 'delete'].map((field) => (
      <FormControlLabel
        key={field}
        control={
          <Switch
            checked={formData[field]}
            onChange={onChange}
            name={field}
          />
        }
        label={field.toUpperCase()}
      />
    ))}
  </Box>
);

export default PermissionSwitches;
