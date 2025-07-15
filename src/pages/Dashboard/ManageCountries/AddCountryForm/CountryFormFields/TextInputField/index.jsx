import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { inputFieldStyle } from '../../countryFormStyles';

const TextInputField = ({ label, value, onChange, required }) => (
  <TextField
    label={label}
    fullWidth
    value={value}
    onChange={onChange}
    required={required}
    sx={inputFieldStyle}
  />
);

TextInputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default TextInputField;