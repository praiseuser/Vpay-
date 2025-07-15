import React from 'react';
import { TextField } from '@mui/material';

const inputFontStyle = {
  fontSize: '13px',
};

const UsernameField = ({ name, label, value, onChange }) => {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      required
      InputProps={{ sx: { ...inputFontStyle, height: 45,  } }}
      InputLabelProps={{ sx: inputFontStyle }}
    />
  );
};

export default UsernameField;