import { useEffect } from 'react';
import { useCreateFeeCurrency } from '../../../../Hooks/useFeeCurrency';

export function useAddFeeLogic({ initialFormData, setFormData, handleCreateFee }) {
  const {
    createFiatCurrency,
    loading,
    error,
    success,
    successMessage,
    showPasswordModal,
    setShowPasswordModal,
    activityPin,
    setactivityPin,
    passwordVerified,
    resetState,
  } = useCreateFeeCurrency();

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData, setFormData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'fee_amount' || name === 'max_limit' ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...initialFormData };

    const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
    const VALID_FEE_TYPES = ['percentage', 'fixed'];

    if (!formData.fee_name || !VALID_FEE_NAMES.includes(formData.fee_name)) {
      return;
    }
    if (!formData.fee_type || !VALID_FEE_TYPES.includes(formData.fee_type)) {
      return;
    }
    const feeAmount = Number(formData.fee_amount);
    if (isNaN(feeAmount) || feeAmount <= 0) {
      return;
    }
    if (formData.has_max_limit) {
      const maxLimit = Number(formData.max_limit);
      if (isNaN(maxLimit) || maxLimit <= 0) {
        return;
      }
    }

    const payload = {
      fee_name: formData.fee_name || '',
      fee_type: formData.fee_type || '',
      fee_amount: Number(formData.fee_amount) || 0,
      status: Boolean(formData.status),
      has_max_limit: Boolean(formData.has_max_limit),
      max_limit: formData.has_max_limit ? Number(formData.max_limit) || 0 : null,
    };

    console.log('Sending payload to createFiatCurrency:', payload);

    if (passwordVerified) {
      const success = await createFiatCurrency(payload, activityPin);
      if (success) {
        handleCreateFee(payload);
      }
    } else {
      setShowPasswordModal(true); 
    }
  };

  return {
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
    createFiatCurrency,
    showPasswordModal,
    setShowPasswordModal,
    activityPin,
    setactivityPin,
    passwordVerified,
    resetState,
  };
}

export default useAddFeeLogic;