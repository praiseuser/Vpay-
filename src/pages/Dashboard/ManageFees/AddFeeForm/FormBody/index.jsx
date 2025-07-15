import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  styled,
  Typography,
} from '@mui/material';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  flex: 1,
  '& .MuiInputBase-root': {
    height: 40,
    fontSize: '0.85rem',
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    fontSize: '0.85rem',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: 200,
  flex: 1,
  '& .MuiInputBase-root': {
    height: 40,
    fontSize: '0.85rem',
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    fontSize: '0.85rem',
  },
}));

const FormBody = ({ formData, handleChange, loading }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2, width: '100%' }}>
    {/* Row 1: Fee Name & Fee Type */}
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <StyledFormControl>
        <InputLabel>Fee Name</InputLabel>
        <Select
          name="fee_name"
          value={formData.fee_name || ''}
          onChange={handleChange}
          disabled={loading}
          label="Fee Name"
        >
          <MenuItem value=""><em>Select Fee Name</em></MenuItem>
          {['Swap', 'Send', 'PayApp', 'Payout'].map((name) => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl>
        <InputLabel>Fee Type</InputLabel>
        <Select
          name="fee_type"
          value={formData.fee_type || ''}
          onChange={handleChange}
          disabled={loading}
          label="Fee Type"
        >
          <MenuItem value=""><em>Select Fee Type</em></MenuItem>
          {['percentage', 'fixed'].map((type) => (
            <MenuItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Box>

    {/* Row 2: Fee Amount */}
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <StyledTextField
        label="Fee Amount"
        name="fee_amount"
        type="number"
        inputProps={{ min: 0.01, step: '0.01' }}
        helperText={formData.fee_type === 'percentage' ? 'Enter % (e.g., 1.5)' : 'Enter amount'}
        value={formData.fee_amount || ''}
        onChange={handleChange}
        disabled={loading}
        required
      />
    </Box>

    {/* Row 3: Checkboxes */}
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      <FormControlLabel
        control={
          <Checkbox
            name="status"
            checked={!!formData.status}
            onChange={handleChange}
            disabled={loading}
            sx={{ p: 0.5 }}
          />
        }
        label={<Typography fontSize="0.85rem">Enabled</Typography>}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="has_max_limit"
            checked={!!formData.has_max_limit}
            onChange={handleChange}
            disabled={loading}
            sx={{ p: 0.5 }}
          />
        }
        label={<Typography fontSize="0.85rem">Has Max Limit</Typography>}
      />
    </Box>

    {/* Row 4: Max Limit (conditional) */}
    {formData.has_max_limit && (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <StyledTextField
          label="Max Limit"
          name="max_limit"
          type="number"
          inputProps={{ min: 0.01, step: '0.01' }}
          value={formData.max_limit || ''}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </Box>
    )}
  </Box>
);

FormBody.propTypes = {
  formData: PropTypes.shape({
    fee_name: PropTypes.string,
    fee_type: PropTypes.string,
    fee_amount: PropTypes.number,
    status: PropTypes.bool,
    has_max_limit: PropTypes.bool,
    max_limit: PropTypes.number,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FormBody;
