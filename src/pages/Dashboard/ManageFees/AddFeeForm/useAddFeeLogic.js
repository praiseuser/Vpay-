import { useEffect } from 'react';
import { useCreateFeeCurrency } from '../../../../Hooks/useFeeCurrency';

export function useAddFeeLogic({ initialFormData, setFormData, handleCreateFee }) {
  const { createFiatCurrency, loading, error, success } = useCreateFeeCurrency();

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData, setFormData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'fee_amount' || name === 'max_limit'
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
    const VALID_FEE_TYPES = ['percentage', 'fixed'];

    if (!VALID_FEE_NAMES.includes(initialFormData.fee_name)) {
      return;
    }

    if (!VALID_FEE_TYPES.includes(initialFormData.fee_type)) {
      return;
    }

    const feeAmount = Number(initialFormData.fee_amount);
    if (isNaN(feeAmount) || feeAmount <= 0) {
      return;
    }

    if (initialFormData.has_max_limit) {
      const maxLimit = Number(initialFormData.max_limit);
      if (isNaN(maxLimit) || maxLimit <= 0) {
        return;
      }
    }

    const payload = {
      fee_name: initialFormData.fee_name || '',
      fee_type: initialFormData.fee_type || '',
      fee_amount: Number(initialFormData.fee_amount) || 0,
      status: Boolean(initialFormData.status),
      has_max_limit: Boolean(initialFormData.has_max_limit),
      max_limit: initialFormData.has_max_limit ? Number(initialFormData.max_limit) || 0 : null,
    };

    await createFiatCurrency(payload);
    if (success && !error) {
      handleCreateFee();
    }
  };

  return {
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
  };
}

export default useAddFeeLogic;