import { useState, useEffect } from 'react';
import {
  Modal,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useUpdateFee } from '../../../../Hooks/useFeeCurrency';
import { toast } from 'react-toastify';
import FeeForm from '../EditFeeModal/FeeForm';
import Typography from '@mui/material/Typography';
import LoadingErrorDisplay from '../EditFeeModal/LoadingErrorDisplay';
import ActionButtons from '../EditFeeModal/ActionsButton';

function EditFeeModal({ open, fee, onClose, onUpdate }) {
  useEffect(() => {
    console.log('EditFeeModal - Received fee:', fee);
  }, [fee]);

  const [formData, setFormData] = useState({
    fee_name: '',
    fee_type: '',
    fee_amount: '',
    status: false,
    has_max_limit: false,
    max_limit: '',
  });
  const { updateFee, loading, error } = useUpdateFee();

  useEffect(() => {
    if (fee) {
      setFormData({
        fee_name: fee.fee_name || '',
        fee_type: fee.fee_type || '',
        fee_amount: fee.fee_amount ? parseFloat(fee.fee_amount).toString() : '',
        status: fee.status === '1' || fee.status === true,
        has_max_limit: fee.has_max_limit ?? false,
        max_limit: fee.max_limit ? parseFloat(fee.max_limit).toString() : '',
      });
    }
  }, [fee]);

  const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
  const VALID_FEE_TYPES = ['percentage', 'fixed'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting update fee:', formData);

    if (!VALID_FEE_NAMES.includes(formData.fee_name)) {
      toast.error('Fee name must be one of: Swap, Send, PayApp, Payout', {
        toastId: 'edit-fee-name-error',
      });
      return;
    }

    if (!VALID_FEE_TYPES.includes(formData.fee_type)) {
      toast.error('Fee type must be either percentage or fixed', {
        toastId: 'edit-fee-type-error',
      });
      return;
    }

    const feeAmount = parseFloat(formData.fee_amount);
    if (isNaN(feeAmount) || feeAmount <= 0) {
      toast.error('Fee amount must be a positive number', {
        toastId: 'edit-fee-amount-error',
      });
      return;
    }

    if (formData.has_max_limit) {
      const maxLimit = parseFloat(formData.max_limit);
      if (isNaN(maxLimit) || maxLimit <= 0) {
        toast.error('Max limit must be a positive number when Has Max Limit is enabled', {
          toastId: 'edit-fee-limit-error',
        });
        return;
      }
    }

    const payload = {
      fee_name: formData.fee_name,
      fee_type: formData.fee_type,
      fee_amount: feeAmount,
      status: formData.status,
      has_max_limit: formData.has_max_limit,
      max_limit: formData.has_max_limit ? parseFloat(formData.max_limit) : null,
    };

    try {
      const feeId = fee?.id || fee?._id;
      console.log('EditFeeModal - Fee ID being sent to updateFee:', feeId);
      if (!feeId) {
        throw new Error('No fee ID provided');
      }
      await updateFee(feeId, payload);
      onUpdate();
    } catch (err) {
      console.error('Error updating fee:', err);
      toast.error(err.message || 'Failed to update fee', { toastId: 'edit-fee-error' });
    }
  };

  if (!fee && open) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="edit-fee-modal-title"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 4,
            width: { xs: '90%', sm: 500 },
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 24,
            position: 'relative',
          }}
        >
          <Typography id="edit-fee-modal-title" variant="h6" sx={{ mb: 3 }}>
            Edit Fee
          </Typography>
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            No fee data available. Please try again.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-fee-modal-title"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          width: { xs: '90%', sm: 500 },
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 24,
          position: 'relative',
        }}
      >
        <Typography id="edit-fee-modal-title" variant="h6" sx={{ mb: 3 }}>
          Edit Fee
        </Typography>
        <LoadingErrorDisplay loading={loading} error={error} />
        <FeeForm
          formData={formData}
          handleChange={handleChange}
          validFeeNames={VALID_FEE_NAMES}
          validFeeTypes={VALID_FEE_TYPES}
          loading={loading}
        />
        <ActionButtons
          loading={loading}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </Box>
    </Modal>
  );
}

EditFeeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  fee: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fee_name: PropTypes.string,
    fee_type: PropTypes.string,
    fee_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    has_max_limit: PropTypes.bool,
    max_limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditFeeModal;