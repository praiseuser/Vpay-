import React from 'react';
import AddForm from '../../../../../components/AddForm';

const FormBody = ({ formData, handleChange, handleSubmit, loading }) => {
  const textFields = [
    {
      label: 'Fee Name',
      name: 'fee_name',
      value: formData.fee_name,
      onChange: handleChange,
      placeholder: 'Enter Fee Name (e.g., Swap, Send, etc.)',
      required: true,
      disabled: loading,
    },
    {
      label: 'Fee Type',
      name: 'fee_type',
      value: formData.fee_type,
      onChange: handleChange,
      select: true,
      disabled: loading,
      options: [
        { value: '', label: 'Select Fee Type' },
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed' },
      ],
    },
    {
      label: 'Fee Amount',
      name: 'fee_amount',
      value: formData.fee_amount,
      onChange: handleChange,
      type: 'number',
      placeholder: formData.fee_type === 'percentage' ? 'e.g., 1.5%' : 'Enter amount',
      required: true,
      disabled: loading,
    },
    {
      label: 'Enabled',
      name: 'status',
      value: formData.status,
      onChange: handleChange,
      isSwitch: true, // 👈 Toggle switch
      disabled: loading,
    },
    {
      label: 'Has Max Limit',
      name: 'has_max_limit',
      value: formData.has_max_limit,
      onChange: handleChange,
      isCheckbox: true, // 👈 Checkbox
      disabled: loading,
    },
    formData.has_max_limit && {
      label: 'Max Limit',
      name: 'max_limit',
      value: formData.max_limit,
      onChange: handleChange,
      type: 'number',
      disabled: loading,
      required: true,
    },
  ].filter(Boolean);

  return (
    <AddForm
      title='Add Fee'
      description='Fill in the fields below to add a new fee.'
      textFields={textFields}
      logo='/image 5.png'
      onSubmit={handleSubmit}
    />
  );
};

export default FormBody;
