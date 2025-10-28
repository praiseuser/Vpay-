import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useAddProviderCategory } from "../../../../Hooks/useProviderCategory";
import { useFetchCountryCurrencies } from "../../../../Hooks/useCountryCurrency";

const CreateCategoryProviderForm = ({ handleCancel, onSuccess }) => {
    const addProviderCategory = useAddProviderCategory();
    const { countryCurrencies, loading: countriesLoading, error } = useFetchCountryCurrencies();

    const [activityPin, setActivityPin] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [pendingFormData, setPendingFormData] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordVerified, setPasswordVerified] = useState(false);

    const statusOptions = useMemo(
        () => [
            { value: 1, label: "Active" },
            { value: 0, label: "Inactive" },
        ],
        []
    );


    const countryOptions = useMemo(() => {
        if (countriesLoading) return [{ value: "", label: "Loading countries..." }];
        if (error || !countryCurrencies?.length) return [{ value: "", label: "No countries found" }];

        return countryCurrencies.map((c) => ({
            value: c.id,
            label: c.Country_name
        }));
    }, [countryCurrencies, countriesLoading, error]);

    const initialFormValues = useMemo(() => ({
        name: "",
        country_id: "",
        status: 1,
    }), []);

    const fields = useMemo(() => [
        { name: "name", label: "Category Name", type: "text", required: true },
        { name: "country_id", label: "Country", type: "text", select: true, options: countryOptions, required: true },
        { name: "status", label: "Status", type: "text", select: true, options: statusOptions, required: true },
    ], [countryOptions, statusOptions]);

    const handleSubmit = (data) => {
        if (!data.name || !data.country_id || data.status === undefined) {
            CustomErrorToast("All required fields must be filled.");
            return;
        }

        if (!passwordVerified) {
            setPendingFormData(data);
            setShowPasswordModal(true);
            return;
        }

        submitCategory(data);
    };

    const submitCategory = async (categoryData) => {
        const payload = {
            category_name: categoryData.name,
            country_id: categoryData.country_id,
            status: String(categoryData.status),
        };

        const result = await addProviderCategory(payload, activityPin);
        if (result?.error === 0 || result?.success) {
            CustomSuccessToast("Provider category created successfully!");
            handleCancel();
            onSuccess?.();
            setActivityPin("");
            setPasswordVerified(true);
            setPendingFormData(null);
            setShowPasswordModal(false);
        } else {
            CustomErrorToast(result?.message || "Failed to add provider category");
        }
    };


    const handlePasswordSubmit = async () => {
        if (!activityPin.trim() || !pendingFormData) return;

        setPasswordLoading(true);
        await submitCategory(pendingFormData);
        setPasswordLoading(false);
    };

    const handlePasswordModalClose = () => {
        setPendingFormData(null);
        setShowPasswordModal(false);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <AddForm
                title="ADD Provider CATEGORY"
                description="Fill the details to add a new provider category."
                textFields={fields}
                initialValues={initialFormValues}
                onSubmit={handleSubmit}
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

export default CreateCategoryProviderForm;
