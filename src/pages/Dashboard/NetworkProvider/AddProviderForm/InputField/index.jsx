import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const InputField = ({
  name,
  label,
  value,
  onChange,
  required,
  type,
  select,
  options,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      select={select}
      InputProps={{
        sx: {
          height: 40,
          width: '95%',
          maxWidth: 320,
          border: 'none',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.03)',
          input: { padding: '8px 12px' },
        },
      }}
      InputLabelProps={{
        sx: {
          fontSize: '15px', 
        },
      }}
    >
      {select &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default InputField;