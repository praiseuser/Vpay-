import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import { useUpdateProviders } from "../../../../Hooks/useProviderName";
import { useGetProviderCategory } from "../../../../Hooks/useProviderCategory";
import { useFetchCountryCurrencies } from "../../../../Hooks/useCountryCurrency";

const EditProviders = ({ providerData, onUpdateSuccess, onCancel }) => {
  const updateProvider = useUpdateProviders();
  const { categoryData, loading: categoryLoading } = useGetProviderCategory();
  const { countryCurrencies, loading: countryLoading } = useFetchCountryCurrencies();

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const initialFormValues = useMemo(
    () => ({
      provider_name: providerData?.provider_name || "",
      provider_category_id: providerData?.provider_category_id || "",
      country_id: providerData?.country_id || "",
      unit_rate: providerData?.unit_rate || "",
      status: providerData?.status ? String(providerData.status) : "1",
      provider_image: providerData?.provider_image || "",
    }),
    [providerData]
  );

  const fields = useMemo(
    () => [
      {
        name: "provider_name",
        label: "Provider Name",
        type: "text",
        required: true,
      },
      {
        name: "provider_category_id",
        label: "Provider Category",
        select: true,
        required: true,
        options:
          categoryData?.map((cat) => ({
            label: cat.category_name,
            value: cat.id,
          })) || [],
        loading: categoryLoading,
      },
      {
        name: "country_id",
        label: "Country",
        select: true,
        required: true,
        options:
          countryCurrencies?.map((country) => ({
            label: country.Country_name,
            value: country.id,
          })) || [],
        loading: countryLoading,
      },
      {
        name: "unit_rate",
        label: "Unit Rate",
        type: "number",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        select: true,
        required: true,
        options: [
          { label: "Active", value: "1" },
          { label: "Inactive", value: "0" },
        ],
      },
      {
        name: "provider_image",
        label: "Provider Image",
        type: "file",
        accept: "image/*",
        required: false,
      },
    ],
    [categoryData, categoryLoading, countryCurrencies, countryLoading]
  );

  const handleSubmit = (data) => {
    if (!data.provider_name || !data.country_id || !data.provider_category_id || !data.unit_rate) {
      CustomErrorToast("Please fill in all required fields.");
      return;
    }

    setPendingFormData(data);
    setShowPasswordModal(true);
  };

  const submitProvider = async (formData) => {
    let finalImage = formData.provider_image;

    if (!finalImage || (!finalImage.startsWith('data:image') && finalImage === providerData.provider_image)) {
      finalImage = providerData.provider_image;
    }

    const payload = {
      provider_name: formData.provider_name,
      provider_category_id: String(formData.provider_category_id),
      country_id: String(formData.country_id),
      unit_rate: formData.unit_rate,
      status: String(formData.status),
      provider_image: finalImage,
    };

    try {
      const result = await updateProvider(providerData.id, payload, activityPin);
      if (result?.error === 0 || result?.code === 0) {
        onUpdateSuccess?.();
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setActivityPin("");
      setShowPasswordModal(false);
      setPasswordLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingFormData) return;
    setPasswordLoading(true);
    await submitProvider(pendingFormData);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPendingFormData(null);
    setActivityPin("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="EDIT PROVIDER"
        description="Update provider details below."
        textFields={fields}
        onSubmit={handleSubmit}
        initialValues={initialFormValues}
        submitText="Update Provider"
      />

      <PasswordModal
        open={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        password={activityPin}
        setPassword={setActivityPin}
        loading={passwordLoading}
        error={null}
      />
    </Box>
  );
};

export default EditProviders;