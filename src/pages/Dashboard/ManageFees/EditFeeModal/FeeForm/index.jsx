import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';

const FeeForm = ({ formData, handleChange, validFeeNames, validFeeTypes, loading }) => (
  <form>
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Fee Name</InputLabel>
      <Select
        name="fee_name"
        value={formData.fee_name}
        onChange={handleChange}
        label="Fee Name"
        required
        disabled={loading}
      >
        {validFeeNames.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Fee Type</InputLabel>
      <Select
        name="fee_type"
        value={formData.fee_type}
        onChange={handleChange}
        label="Fee Type"
        required
        disabled={loading}
      >
        {validFeeTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <TextField
      fullWidth
      label="Fee Amount"
      name="fee_amount"
      type="number"
      value={formData.fee_amount}
      onChange={handleChange}
      sx={{ mb: 2 }}
      required
      disabled={loading}
    />

    <FormControlLabel
      control={
        <Switch
          name="status"
          checked={formData.status}
          onChange={handleChange}
          disabled={loading}
        />
      }
      label="Status (Enabled)"
      sx={{ mb: 2 }}
    />

    <FormControlLabel
      control={
        <Switch
          name="has_max_limit"
          checked={formData.has_max_limit}
          onChange={handleChange}
          disabled={loading}
        />
      }
      label="Has Max Limit"
      sx={{ mb: 2 }}
    />

    {formData.has_max_limit && (
      <TextField
        fullWidth
        label="Max Limit"
        name="max_limit"
        type="number"
        value={formData.max_limit}
        onChange={handleChange}
        sx={{ mb: 2 }}
        required
        disabled={loading}
      />
    )}
  </form>
);

FeeForm.propTypes = {
  formData: PropTypes.shape({
    fee_name: PropTypes.string.isRequired,
    fee_type: PropTypes.string.isRequired,
    fee_amount: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    has_max_limit: PropTypes.bool.isRequired,
    max_limit: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  validFeeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  validFeeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FeeForm;