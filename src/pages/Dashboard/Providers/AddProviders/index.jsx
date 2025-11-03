import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useAddProvider } from "../../../../Hooks/useProviderName";
import { useGetProviderCategory } from "../../../../Hooks/useProviderCategory";
import { useFetchCountryCurrencies } from "../../../../Hooks/useCountryCurrency";

const CreateProvidersForm = ({ handleCancel, onSuccess }) => {
    const addProvider = useAddProvider();
    const { categoryData, loading: categoryLoading } = useGetProviderCategory();
    const { countryCurrencies, loading: countryLoading } = useFetchCountryCurrencies();

    const [activityPin, setActivityPin] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [pendingFormData, setPendingFormData] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordVerified, setPasswordVerified] = useState(false);

    const initialFormValues = useMemo(
        () => ({
            provider_name: "",
            provider_category_id: "",
            country_id: "",
            unit_rate: "",
            status: "1",
            provider_image: "",
        }),
        []
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
                required: true,
            },
        ],
        [categoryData, categoryLoading, countryCurrencies, countryLoading]
    );

    const handleSubmit = (data) => {
        if (
            !data.provider_name ||
            !data.provider_category_id ||
            !data.country_id ||
            !data.unit_rate
        ) {
            CustomErrorToast("All required fields must be filled.");
            return;
        }

        if (!passwordVerified) {
            setPendingFormData(data);
            setShowPasswordModal(true);
            return;
        }

        submitProvider(data);
    };

    const submitProvider = async (providerData) => {
        const payload = {
            provider_name: providerData.provider_name,
            provider_category_id: String(providerData.provider_category_id),
            country_id: String(providerData.country_id),
            unit_rate: providerData.unit_rate,
            status: String(providerData.status),
            provider_image: providerData.provider_image,
        };

        try {
            const result = await addProvider(payload, activityPin);

            if (result?.success || result?.code === 0 || result?.error === 0) {
                CustomSuccessToast(result?.message || "Provider added successfully!");
                handleCancel();
                onSuccess?.();
                setPasswordVerified(true);
                setPendingFormData(null);
            } else {
                CustomErrorToast(result?.message || "Failed to add provider!");
            }
        } catch (error) {
            console.error(error);
            CustomErrorToast("An error occurred while adding the provider!");
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
        setPendingFormData(null);
        setShowPasswordModal(false);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <AddForm
                title="ADD PROVIDER"
                description="Fill in the details below to add a new provider."
                textFields={fields}
                initialValues={initialFormValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
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

export default CreateProvidersForm;
