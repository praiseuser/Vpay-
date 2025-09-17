import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import InputField from '../../AddFeeForm/InputField';
import ProgressIndicator from '../../AddFeeForm/ProgressIndicator';

const FormBody = ({ formData, handleChange, loading }) => {
  const steps = [
    !!formData.fee_name && formData.fee_name !== '',
    !!formData.fee_amount,
    formData.has_max_limit ? !!formData.max_limit : true,
  ]; // Only active if fields are filled

  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      {/* Row 1: Fee Name */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <InputField
          label="Fee Name"
          name="fee_name"
          value={formData.fee_name}
          onChange={handleChange}
          options={[
            { value: '', label: 'Select Fee Name' },
            { value: 'Swap', label: 'Swap' },
            { value: 'Send', label: 'Send' },
            { value: 'PayApp', label: 'PayApp' },
            { value: 'Payout', label: 'Payout' },
          ]}
          disabled={loading}
        />
      </Box>

      {/* Row 2: Fee Type */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <InputField
          label="Fee Type"
          name="fee_type"
          value={formData.fee_type}
          onChange={handleChange}
          options={[
            { value: '', label: 'Select Fee Type' },
            { value: 'percentage', label: 'Percentage' },
            { value: 'fixed', label: 'Fixed' },
          ]}
          disabled={loading}
        />
      </Box>

      {/* Row 3: Fee Amount */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <InputField
          label="Fee Amount"
          name="fee_amount"
          value={formData.fee_amount}
          onChange={handleChange}
          type="number"
          placeholder={formData.fee_type === 'percentage' ? 'e.g., 1.5%' : 'Enter amount'}
          disabled={loading}
          required
        />
      </Box>

      {/* Row 4: Enabled */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <InputField
          label="Enabled"
          name="status"
          value={formData.status}
          onChange={handleChange}
          isCheckbox={true}
          disabled={loading}
        />
      </Box>

      {/* Row 5: Has Max Limit */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <InputField
          label="Has Max Limit"
          name="has_max_limit"
          value={formData.has_max_limit}
          onChange={handleChange}
          isCheckbox={true}
          disabled={loading}
        />
      </Box>

      {formData.has_max_limit && (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <InputField
            label="Max Limit"
            name="max_limit"
            value={formData.max_limit}
            onChange={handleChange}
            type="number"
            disabled={loading}
            required
          />
        </Box>
      )}

      <ProgressIndicator steps={steps} />
    </Box>
  );
};

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