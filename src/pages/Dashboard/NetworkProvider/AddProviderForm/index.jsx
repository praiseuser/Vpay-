import React, { useEffect, useState } from 'react';
import { useCreateProvider } from '../../../../Hooks/useProvider';
import ProviderForm from '../AddProviderForm/ProviderForm';


const AddProviderForm = ({ onCancel }) => {
  const { createProvider, isCreating, error, countries } = useCreateProvider();
  const [formData, setFormData] = useState({
    provider_name: "",
    country_id: "",
    unit_rate: "",
    provider_category: "",
    status: "",
  });

  useEffect(() => {
    if (error) {
      console.error("Form error:", error);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const statusBool = formData.status === "active";

    const result = await createProvider({ ...formData, status: statusBool });
    if (result.success) {
      setFormData({
        provider_name: "",
        country_id: "",
        unit_rate: "",
        provider_category: "",
        status: "",
      });
      onCancel();
    }
  };

  return (
    <ProviderForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isCreating={isCreating}
      error={error}
      countries={countries}
      onCancel={onCancel}
    />
  );
};

export default AddProviderForm;